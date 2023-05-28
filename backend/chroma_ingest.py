from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from chromadb.config import Settings
from langchain.embeddings import HuggingFaceEmbeddings

with open("./state_of_the_union.txt", "r", encoding="utf-8") as file:
    raw_text = file.read()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
texts = text_splitter.split_text(raw_text)

model_name = "sentence-transformers/all-mpnet-base-v2"
model_kwargs = {"device": "cpu"}
embeddings = HuggingFaceEmbeddings(model_name=model_name, model_kwargs=model_kwargs)

client_settings = Settings(
    chroma_api_impl="rest",
    chroma_server_host="localhost",
    chroma_server_http_port="8000",
)

collection_name = "demodb"

vectorstore = Chroma.from_texts(
    embedding=embeddings,
    texts=texts,
    client_settings=client_settings,
    collection_name=collection_name,
)


retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

docs = retriever.get_relevant_documents("what did he say abotu ketanji brown jackson")

print(docs)
