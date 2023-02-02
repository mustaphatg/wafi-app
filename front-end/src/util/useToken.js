import { useState } from "react";

export default function useToken() {
    
	function getToken() {
		var token = localStorage.getItem("token");
		return token;
	}

	const [token, setToken] = useState(getToken());


    // save user token
	function saveUserToken(token) {
        localStorage.setItem('token', token)
        
        // update use state token
        setToken(token)
    }


    // delete token for logout
    function deleteToken(){
        localStorage.removeItem('token')
        setToken(null)
    }

    return {
        token : token,
        saveUserToken : saveUserToken,
        deleteToken : deleteToken
    }
}
