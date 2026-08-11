from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app=FastAPI(title="Feedback API")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
feedback=[];next_id=1
class Feedback(BaseModel):
    name:str
    rating:int
    comment:str

@app.get("/feedback")
def get_feedback(): return feedback

@app.post("/feedback")
def add_feedback(item:Feedback):
    global next_id
    data={"id":next_id,**item.model_dump()};next_id+=1;feedback.append(data);return data
