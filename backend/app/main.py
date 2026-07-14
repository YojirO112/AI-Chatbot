from app.services.gemini import get_ai_response
from fastapi import FastAPI
from app.schemas.chat import ChatRequest
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Hello AI Engineer"
    }

@app.get("/about")
def about():
    return {
        "name" : "Akash",
        "goal" : "Become AI Product Engineer"
    }

@app.post("/chat")
def chat (request: ChatRequest):
    # the request message is stored in request.message and get_ai_response takes a prompt to give you the answer so request.message is prompt/question asked to the ai
    ai_response = get_ai_response(request.message)
    return {
        # "reply": f"Hello {request.username}, you said  {request.message}"
        "reply": ai_response
    }