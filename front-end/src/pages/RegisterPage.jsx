import React from "react";
import { useState, useEffect } from "react";
import {api} from '../util/api'
import useToken from '../util/useToken'
import {useNavigate, Link} from 'react-router-dom'



export default function RegisterPage() {


    // token utils
    const {token, saveUserToken} = useToken()

    // navigate object
    const navigate  = useNavigate()

    const [data, setData] = useState({
        name : '',
        email : '',
        password : ''
    })


    // login error
    const [register_error, setRegisterError] = useState(false)

    const [error, setError] = useState('')


    // set data value
    const setValue = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    function register(){
       
        api.post('/register', data)
        .then(({data}) => {
            if(data.token){
                saveUserToken(data.token)
                // navigate('/account')
                // navigate with refresh to get updated data
                location.href = '/account'
            }

        })
        .catch(er => {
            console.log(er.response.data)

            if(er.response.data.msg){
                setRegisterError(true)
                setError(er.response.data.msg)
            }

        })
    }



  return (
    <div className="w-full h-5/6  flex items-center justify-center">

    <div className="flex flex-wrap w-3/4 lg:w-1/3 border border-black p-2 lg:p-4 rounded-md bg-white">
        <h3 className="w-full text-center font-mono lg:text-4xl">
            Register
        </h3>
        <div className="flex my-5  flex-col items-around w-full lg:w-3/5 mx-auto">
            
            {/* error */}
            {register_error ? <p className="text-red-900 text-center">{error}</p> : '' }


            {/* name */}
            <input type="text" onChange={setValue}  name='name' placeholder="Full Name" className="my-3 input input-bordered w-full max-w-xs" />

            {/* email */}
            <input type="text" onChange={setValue} name='email' placeholder="Email Address" className="my-3 input input-bordered w-full max-w-xs" />

            {/* password */}
            <input type="password"onChange={setValue} name='password' placeholder="Password" className="my-3 input input-bordered w-full max-w-xs" />

            {/* login button */}
            <button className="btn" onClick={register}>SIGNUP</button>

            <Link to="/login" className="underline text-blue-500 my-4">Existing user? login</Link>

        </div>
    </div>

</div>
  )
}
