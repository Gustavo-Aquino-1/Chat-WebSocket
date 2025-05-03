import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/Context";
import { useHistory } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";


function Chat() {
  const { user, messages, setMessages, setUser, socket } = useContext(Context);
  const history = useHistory();
  const [message, setMessage] = useState('')
  const refDiv = useRef(null)
  const list = useRef(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll Y da página:', window.scrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    // if()
    // console.log(window.scrollY, refDiv.current.getBoundingClientRect().top)
    // console.log('bottom', window.scrollY + refDiv.current.getBoundingClientRect().top)
    const sb = (window.scrollY + refDiv.current.getBoundingClientRect().top) - window.scrollY
    console.log(sb)
    if(sb < 1000) {
      refDiv.current?.scrollIntoView({ behavior: 'smooth'}) // scrollIntoView scrollar ate o elemento ficar visivel, como esse elemento esta baixo da lista de mensagens, logo quando a lista de mensgaens começar a encher ele vai continuar indo para baixo para manter essa div que esta abaixo da lista visível.
      setHasNewMessage(false)
    }
    else {
      setHasNewMessage(true)
    }
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send_message', {id: Math.random(), message, user })
    setMessage('')
  };

  
    
  return (
    <div className="p-5 flex flex-col items-center pt-10 gap-10 relative min-h-screen">

      {hasNewMessage && (
        <button className="fixed top-0 mt-5 text-blue-600 text-xl">
          <FaArrowAltCircleDown onClick={() => {
            refDiv.current?.scrollIntoView({ behavior: 'smooth'}) 
            setHasNewMessage(false)
          }} />

        </button>
      )}

      <div ref={list} className="w-full flex flex-col gap-5 pb-5">
        {messages?.map(({ id, message, user: author }) => (
          <section className={`${author.id == user.id ? 'self-end': 'self-start'} min-w-[30%] bg-gray-500 rounded `} key={id}>
            <p style={{ color: author.color }} className="px-3">{author.name}</p>
            <p className={` text-white rounded px-4 py-1`}>
              {message} 
            </p>
          </section>
        ))}
      </div>

      <div ref={refDiv}></div>

      

      <form onSubmit={sendMessage} className="w-[100%] flex gap-3 fixed bottom-0 p-3 bg-gray-500">
        <input minLength={1} value={message} onChange={({ target }) => setMessage(target.value)} className='border-gray-300 border-2 shadow-md rounded w-[90%] py-1 outline-none px-2' type="text" />
        <button className="bg-blue-600 text-white py-1 px-4 rounded" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
