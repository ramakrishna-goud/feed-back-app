import {useEffect,useState} from "react";
const API="http://localhost:8000";
export default function App(){
 const [items,setItems]=useState([]),[name,setName]=useState(""),[rating,setRating]=useState(5),[comment,setComment]=useState("");
 const load=()=>fetch(`${API}/feedback`).then(r=>r.json()).then(setItems);useEffect(load,[]);
 async function submit(){await fetch(`${API}/feedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,rating:Number(rating),comment})});setName("");setComment("");load();}
 return <div className="app"><h1>Customer Feedback</h1><input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/><select value={rating} onChange={e=>setRating(e.target.value)}>{[1,2,3,4,5].map(x=><option key={x}>{x}</option>)}</select><textarea placeholder="Comment" value={comment} onChange={e=>setComment(e.target.value)}/><button onClick={submit}>Submit</button>{items.map(f=><div className="card" key={f.id}><b>{f.name}</b> — {f.rating}/5<p>{f.comment}</p></div>)}</div>
}
