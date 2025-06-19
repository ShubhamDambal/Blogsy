import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)   //we are checking from store that user is logged in or not. Not just rely on authentication parameter which user passes.

  //protection conditions/mechanisms
  useEffect(() => {
    if(authentication && authStatus !== authentication){
      navigate("/login")
    }
    else if(!authentication && authStatus !== authentication){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default Protected