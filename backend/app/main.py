import torch
from fastapi import FastAPI, UploadFile, File
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from chromadb.config import Settings
from langchain.embeddings import HuggingFaceEmbeddings
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from langchain.chains import RetrievalQA
from langchain.llms import HuggingFacePipeline
from langchain import PromptTemplate, LLMChain
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferWindowMemory


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("step 1")
use_cuda = torch.cuda.is_available()

model_name = "./app/model/embedding_model"
if torch.cuda.is_available():
    model_kwargs = {"device": "cuda"}
else:
    model_kwargs = {"device": "cpu"}
embeddings = HuggingFaceEmbeddings(model_name=model_name, model_kwargs=model_kwargs)
print("step 2")
device_index = torch.cuda.device_count()
device = torch.device(f'cuda:{device_index-1}' if torch.cuda.is_available() else 'cpu')
model = torch.load("./app/model/gptv.pt")

tokenizer = AutoTokenizer.from_pretrained("./app/model/gptw13_tokenizer/")
tokenizer.pad_token_id = 0
model = AutoModelForCausalLM.from_pretrained("./app/model/gptw13/",
                                              load_in_8bit=True,
                                              device_map='auto',
                                              torch_dtype=torch.float16
                                              )
# generate_text = pipeline(
#     "text-generation",
#     model=model,
#     tokenizer=tokenizer,
#     device=device,
#     max_length=1200,
#     trust_remote_code=True,
#     return_full_text=True,
#     num_beams=2,
#     min_new_tokens=10,
#     repetition_penalty=2.0,
#     temperature=1,
#     early_stopping=True
# )
generate_text = pipeline(
    "text-generation",
    model=model, 
    tokenizer=tokenizer, 
    max_length=1200,
    temperature=0.7,
    top_p=0.95,
    repetition_penalty=1.15,
    return_full_text=True,
    early_stopping=True
)
print("step 3")
# prompt = PromptTemplate(
#     template="Question: {question}\nAnswer:", input_variables=["question"]
# )

print("step 4")
client_settings = Settings(
    chroma_api_impl="rest",
    chroma_server_host="server",
    chroma_server_http_port="8000",
)
chromaDB = Chroma(
    "demodb", client_settings=client_settings, embedding_function=embeddings
)

template = """Assistant is a large language model.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.

Overall, Assistant is a powerful tool that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.

{history}
Human: {human_input}
Assistant:"""

prompt = PromptTemplate(
    input_variables=["history", "human_input"], 
    template=template
)

memory = ConversationBufferWindowMemory(k=2)

print("step 5")
def check_gpu(use_cuda):
    if use_cuda:
        return [
            {"__CUDNN VERSION:", torch.backends.cudnn.version()},
            {"__Number CUDA Devices:", torch.cuda.device_count()},
            {"__CUDA Device Name:", torch.cuda.get_device_name(0)},
            {
                "__CUDA Device Total Memory [GB]:",
                torch.cuda.get_device_properties(0).total_memory / 1e9,
            },
        ]
    else:
        return {"no gpu", use_cuda}


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/checkgpu")
def gpu_check():
    return check_gpu(use_cuda)


@app.post("/read_txt_file")
async def upload_text(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(file.filename, "wb") as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    texts = text_splitter.split_text(contents.decode())

    collection_name = "demodb"

    vectorstore = Chroma.from_texts(
        embedding=embeddings,
        texts=texts,
        client_settings=client_settings,
        collection_name=collection_name,
    )

    return {"message": f"Successfully uploaded {file.filename}"}


@app.post("/get_vector_matching")
async def get_matching(query: str, k: int):
    retriever = chromaDB.as_retriever(search_kwargs={"k": k})
    docs = retriever.get_relevant_documents(query)
    output = []
    for doc in docs:
        temp_dict = {}
        temp_dict["page_content"] = doc.page_content
        temp_dict["metadata"] = doc.metadata
        output.append(temp_dict)
    return output


@app.post("/get_llm")
async def get_llm(query: str):
    text = generate_text(query)
    return text


@app.post("/get_llm_chat")
async def get_llm_chat(query: str):
    llm_chain = LLMChain(prompt=prompt, 
                     llm=HuggingFacePipeline(pipeline=generate_text), 
                     memory=memory)
    response = llm_chain.predict(human_input=query)
    return response


@app.post("/get_llm_context")
async def get_context(query: str, k: int):
    qa = RetrievalQA.from_chain_type(
        llm=HuggingFacePipeline(pipeline=generate_text),
        chain_type="stuff",
        retriever=chromaDB.as_retriever(search_kwargs={"k": k}),
    )
    result = qa.run(query)
    return result
