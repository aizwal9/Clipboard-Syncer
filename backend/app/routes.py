from fastapi import APIRouter, HTTPException
from app.config import redis_client
import uuid
import os

router = APIRouter()

EXPIRY_TIME = int(os.getenv("EXPIRY_TIME", 300))

@router.post("/store/")
def store_clipboard(data: dict):
    text = data.get("text")
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    token = str(uuid.uuid4())[:8] 
    redis_client.setex(token, EXPIRY_TIME, text)

    return {"token": token}

@router.get("/retrieve/{token}")
def retrieve_clipboard(token: str):
    text = redis_client.get(token)
    if text:
        redis_client.delete(token)
        return {"text": text}
    raise HTTPException(status_code=404, detail="Token expired or invalid")
