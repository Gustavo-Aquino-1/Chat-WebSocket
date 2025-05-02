import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useHistory } from "react-router-dom";

function Chat() {
  const { user, messages, setMessages, setUser, socket } = useContext(Context);
  const history = useHistory();
  const [message, setMessage] = useState('')

  useEffect(() => {
    // if(!user) history.push('/')
    if(!user) history.push('/')
    socket.connect(); // server precisa disso para se conectar caso contrario não pega

    socket.off('new_message')
    socket.on("new_message", (data) => {
      console.log(data);
      setMessages((prevState) => [...prevState, data])
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send_message', {id: Math.random(), message, user })
    setMessage('')
  };

  function getRandomLightColor() {
    // Ensuring RGB values are more towards the lighter side (range 128-255)
    const r = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    const g = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    const b = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
  
    // Returning the color in the format "rgb(r, g, b)"
    return `rgb(${r}, ${g}, ${b})`;
  }
    
  return (
    <div className="p-5 flex flex-col items-center pt-10 gap-10 relative min-h-screen">
      <div className="w-full flex flex-col gap-5 pb-20">
        {messages?.map(({ id, message, user: author }) => (
          <section className={`${author.id == user.id ? 'self-end': 'self-start'} min-w-[30%] bg-gray-500 rounded `} key={id}>
            <p style={{ color: getRandomLightColor() }} className="px-3">{author.name}</p>
            <p className={` text-white rounded px-4 py-1`}>
              {message} 
            </p>
          </section>
        ))}
      </div>

      <form onSubmit={sendMessage} className="w-[100%] flex gap-3 fixed bottom-0 p-3 bg-gray-500">
        <input minLength={1} value={message} onChange={({ target }) => setMessage(target.value)} className='border-gray-300 border-2 shadow-md rounded w-[90%] py-1 outline-none px-2' type="text" />
        <button className="bg-blue-600 text-white py-1 px-4 rounded" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
