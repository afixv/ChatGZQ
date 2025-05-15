import fitz
from sentence_transformers import SentenceTransformer
import faiss
import os
import pickle

model = SentenceTransformer("LazarusNLP/all-indobert-base-v2")

def extract_text_from_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"File '{pdf_path}' tidak ditemukan.")
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def split_text_into_chunks(text, max_length=500):
    paragraphs = text.split('\n')
    chunks = []
    current_chunk = ""
    for para in paragraphs:
        if len(current_chunk) + len(para) <= max_length:
            current_chunk += " " + para.strip()
        else:
            chunks.append(current_chunk.strip())
            current_chunk = para.strip()
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks

def build_faiss_index(chunks, index_path='faiss_index'):
    embeddings = model.encode(chunks, convert_to_numpy=True)

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    faiss.write_index(index, f"{index_path}.index")
    with open(f"{index_path}_docs.pkl", "wb") as f:
        pickle.dump(chunks, f)

    print(f"Index berhasil disimpan ke {index_path}.index dan {index_path}_docs.pkl")

def process_pdf_to_rag_index(pdf_path, index_path):
    text = extract_text_from_pdf(pdf_path)
    chunks = split_text_into_chunks(text)
    build_faiss_index(chunks, index_path)

if __name__ == "__main__":
    pdf_file = "panduan_gizi.pdf"
    index_path = "faiss_index"
    process_pdf_to_rag_index(pdf_file, index_path)
