import React, { useMemo, useState } from "react";
import Context from "./Context";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001/");

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  

  const value = useMemo( 
    () => ({
      user,
      setUser,
      messages,
      setMessages,
      socket,
    }),
    [user, messages, socket, setMessages, setUser]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
