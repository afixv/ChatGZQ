from sentence_transformers import SentenceTransformer
import faiss
import pickle
import numpy as np

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal, List

from groq import Groq

from dotenv import load_dotenv
import os

from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# RAG
model = SentenceTransformer("LazarusNLP/all-indobert-base-v2")

index = faiss.read_index("./rag_index/faiss_index.index")
with open("./rag_index/faiss_index_docs.pkl", "rb") as f:
    documents = pickle.load(f)

def retrieve(query, top_k=2):
    """Retrieve the most relevant documents for a query."""
    query_embedding = model.encode([query])
    _, indices = index.search(np.array(query_embedding), top_k)
    return [documents[i] for i in indices[0]]

# FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str
class QueryRequest(BaseModel):
    messages: List[Message]

# Chatbot
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.post("/query")
def generate_response(request: QueryRequest):
    messages = [
        {
            "role": "system",
            "content": "Anda adalah asisten AI konsultasi gizi yang menjawab pertanyaan pengguna tentang gizi, kesehatan, dan masalah stunting.",
        },
        *[msg.model_dump() for msg in request.messages],
    ]

    chat_completion = client.chat.completions.create(
        messages=messages,
        model="llama-3.3-70b-versatile",
    )

    result = chat_completion.choices[0].message.content
    return result