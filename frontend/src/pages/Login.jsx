import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { useHistory } from 'react-router-dom'

function Login() {
  const { user, setUser } = useContext(Context)
  const [name, setName] = useState()
  const history = useHistory()

  const entry = () => { 
    setUser({ id: Math.random(), name })
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