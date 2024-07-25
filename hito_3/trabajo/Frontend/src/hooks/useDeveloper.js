import { useState } from 'react'

const useDeveloper = () => {
  const [userSession, setUserSession] = useState(null)

  const setDeveloper = (develop) => setUserSession(develop)

  return { getDeveloper: userSession, setDeveloper }
}

export default useDeveloper
