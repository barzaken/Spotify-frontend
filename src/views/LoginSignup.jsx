import { useLocation,useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {onSignup,onLogin } from "../store/actions/user.actions.js"
import {alert } from "../store/actions/station.actions.js"

import Logo from '../assets/imgs/spotifylogo.png';


export const LoginSignup = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogin = location.pathname === '/login'

    const [userCred,setUserCred] = useState({fullname:'',username:'',password:''})
    function handleChange ({ target }) {
        const field = target.name
        let value = target.value
        setUserCred(prev => ({...prev,[field]:value}))
      }

      async function loginSignup(){
        if(!userCred.username.trim().length || !userCred.password.trim().length){
          dispatch(alert("Please fill all the fields"))
          return
        }
        isLogin ? await dispatch(onLogin(userCred)) : await dispatch(onSignup(userCred))
        let msg = isLogin ? 'Logged in' : 'Signed up'
        dispatch(alert(msg))
        navigate('/')   
      }
      async function loginDemo(){
        await dispatch(onLogin({username:'Guest',password:1}))
        let msg = isLogin ? 'Logged in' : 'Signed up'
        dispatch(alert(msg))
        navigate('/')   
      }


    return (
        <section className="login-signup">
            <div className="form">
                <div className="logo">
                <img src={Logo} alt="" />
                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                </div>
               {!isLogin && <input onChange={(ev) => handleChange(ev)} name="fullname" placeholder="Name" className="login-input"/>}
                <input onChange={(ev) => handleChange(ev)} name="username" placeholder="Username" className="login-input"/>
                <input onChange={(ev) => handleChange(ev)} name="password" placeholder="Password" type="password" className="login-input"/>
                {isLogin && <button onClick={() => loginDemo()} className="login-btn">Start Demo</button>}
                {isLogin && <button onClick={() =>navigate('/login/signup')} className="login-btn">Not a user? Sign up</button>}
                <button onClick={() => loginSignup()} className="login-btn">{isLogin ? 'Login' : 'Signup'}</button>
                {!isLogin && <button onClick={() =>navigate('/login')} className="login-btn">Have a User? Log in</button>}
            </div>
        </section>
    )
}