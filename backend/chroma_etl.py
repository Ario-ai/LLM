import chromadb
import glob
from chromadb.config import Settings
from InstructorEmbedding import INSTRUCTOR
from langchain.vectorstores import Chroma
from chromadb.config import Settings
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from os import path
from chromadb.api.types import Documents, EmbeddingFunction, Embeddings


class MyEmbeddingFunction(EmbeddingFunction):
    def __call__(self, texts: Documents) -> Embeddings:
        # embed the documents somehow
        return embeddings


dir_path = r"backend/data/*.txt*"
files = []
for file in glob.glob(dir_path, recursive=True):
    files.append(file)
    print(file)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
with open(files[0]) as f:
    lines = f.read().replace("\n", "")
texts = text_splitter.split_text(lines)
name = path.basename(files[0]).split(".")[0]
model = INSTRUCTOR("hkunlp/instructor-xl")
corpus = []
for text in texts:
    temp = []
    temp.append(f"Represent the {name} paragraph for retrieval: ")
    temp.append(text)
    corpus.append(temp)

embeddings = model.encode(corpus)


client = chromadb.Client(
    Settings(
        chroma_api_impl="rest",
        chroma_server_host="3.90.123.35",
        chroma_server_http_port="8000",
    )
)

# client.reset()


collection = client.get_or_create_collection(
    name="demodb", embedding_function=MyEmbeddingFunction
)


collection.add(
    documents=[doc[1] for doc in corpus],
    embeddings=embeddings.tolist(),
    metadatas=[{"document": name} for i in range(len(texts))],
    ids=[name + str(i) for i in range(len(texts))],
)


client_settings = Settings(
    chroma_api_impl="rest",
    chroma_server_host="3.90.123.35",
    chroma_server_http_port="8000",
)

model_kwargs = {"device": "cpu"}
embeddings_model = HuggingFaceInstructEmbeddings(
    model_name="backend/app/model/instructor-xl",
    model_kwargs=model_kwargs,
    # encode_kwargs={"normalize_embeddings": True},
)

chromaDB = Chroma(
    "demodb",
    client_settings=client_settings,
    embedding_function=embeddings_model,
)

retriever = chromaDB.as_retriever(search_kwargs={"k": 5})
docs = retriever.get_relevant_documents(
    "How to change the language on BIS Complete monitor?"
)
print(docs)
