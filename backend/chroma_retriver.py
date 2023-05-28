from langchain.vectorstores import Chroma
from chromadb.config import Settings
from langchain.embeddings import HuggingFaceEmbeddings

client_settings = Settings(
    chroma_api_impl="rest",
    chroma_server_host="localhost",
    chroma_server_http_port="8000",
)
model_name = "sentence-transformers/all-mpnet-base-v2"
model_kwargs = {"device": "cpu"}
embeddings = HuggingFaceEmbeddings(model_name=model_name, model_kwargs=model_kwargs)

chromaDB = Chroma(
    "demodb", client_settings=client_settings, embedding_function=embeddings
)

retriever = chromaDB.as_retriever(search_kwargs={"k": 5})
docs = retriever.get_relevant_documents("what did he say abotu ketanji brown jackson")
print(docs)
