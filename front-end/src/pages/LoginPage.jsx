import React from "react";
import { useState, useEffect } from "react";
import {api} from '../util/api'
import useToken from '../util/useToken'
import {useNavigate, Link} from 'react-router-dom'
import {toast } from 'react-toastify';



export default function LoginPage() {

    // token utils
    const {token, saveUserToken} = useToken()

    // navigate object
    const navigate  = useNavigate()

    const [data, setData] = useState({
        email : '',
        password : ''
    })

    // login error
    const [login_error, setLoginError] = useState(false)

    const [error, setError] = useState('')


    // set data value
    const setValue = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    function login(){

        if(data.email == "" || data.password == ""){
            toast.error("Username and Password are compulsory")
            return
        }
       
        api.post('/login', data)
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
                setLoginError(true)
                setError(er.response.data.msg)
                toast.error("wrong username or password")
            }

        })
    }


	return (
		<div className="w-full flex-1 flex items-center justify-center">

			<div className="flex flex-wrap w-3/4 lg:w-1/3 border border-black p-2 lg:p-4 rounded-md bg-white">
				<h3 className="w-full text-center font-mono lg:text-4xl">
					Login
				</h3>
				<div className="flex my-5  flex-col items-around w-full lg:w-3/5 mx-auto">
					
                    {/* error */}
                    {login_error ? <p className="text-red-900 text-center">{error}</p> : '' }


                    {/* email */}
                    <input type="text" name="email" onChange={setValue} value={data.email} placeholder="Email Address" className="my-3 input input-bordered w-full max-w-xs" />

                    {/* password */}
                    <input type="password" name="password" onChange={setValue} value={data.password} placeholder="Password" className="my-3 input input-bordered w-full max-w-xs" />

                    {/* login button */}
                    <button className="btn" onClick={login}>LOGIN</button>

                    <Link to="/register" className="underline text-blue-500 my-4">New user? register</Link>
				</div>
			</div>

		</div>
	);
}
