const API_KEY='YOUR_GROQ_API_KEY';
const chat=document.getElementById('chat');
async function send(){let i=document.getElementById('msg');let t=i.value.trim();if(!t)return;chat.innerHTML+=`<p><b>You:</b> ${t}</p>`;i.value='';
chat.innerHTML+='<p><i>Thinking...</i></p>';
const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:'llama-3.3-70b-versatile',messages:[{role:'user',content:t}]})});
chat.lastChild.remove();const j=await r.json();chat.innerHTML+=`<p><b>AI:</b> ${j.choices?.[0]?.message?.content||'Error'}</p>`;chat.scrollTop=chat.scrollHeight;}