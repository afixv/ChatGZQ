# 🧠 RAG Chatbot with FastAPI, FAISS, and Groq

This project is a simple Retrieval-Augmented Generation (RAG) chatbot built with FastAPI. It uses a local embedding model to retrieve relevant documents via FAISS, and then generates answers using the Groq API.

## ⚙️ How to Run

- Install dependencies using [uv](https://github.com/astral-sh/uv)
- Create a `.env` file in the project directory:
  ```json
  GROQ_API_KEY=<your_api_key_here>
  ```
- Run the FastAPI app with:
  ```
  uv run fastapi dev
  ```
