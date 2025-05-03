import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { useHistory } from 'react-router-dom'

function Login() {
  const { user, setUser } = useContext(Context)
  const [name, setName] = useState()
  const history = useHistory()

  function getRandomLightColor() {
    // Ensuring RGB values are more towards the lighter side (range 128-255)
    const r = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    const g = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    const b = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
  
    // Returning the color in the format "rgb(r, g, b)"
    return `rgb(${r}, ${g}, ${b})`;
  }

  const entry = () => { 
    setUser({ id: Math.random(), name, color: getRandomLightColor() })
    history.push('/chat')
  }

  useEffect(() => {
    if(user?.name?.length > 0) {
      history.push('/chat')
    }
  }, [])

  return (
    <form className='h-screen flex justify-center items-center flex-col gap-5 w-[300px] m-auto'>
      <input value={name} onChange={({ target }) => setName(target.value)} className='border-gray-300 border-2 shadow-md rounded w-full py-1 outline-none px-2' type="text" />
      <button type='submit' onClick={entry} className='bg-blue-500 rounded text-white py-1 px-5 w-full'>Go</button>
    </form>
  )
}

export default Login