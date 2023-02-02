import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate , Link} from "react-router-dom";
import Header from "../components/Header";
import useToken from "../util/useToken";
import {ToastContainer } from 'react-toastify';
import {api} from '../util/api'




export default function AppLayout({store}) {
	const { token } = useToken();

	const navigate = useNavigate();


    // redirect if token is not available
	useEffect(() => {
		if (!token) {
            navigate('/login')
		}

        // call pre
        // store.getInitialBalance()
        // console.log(store)
	}, []);

	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<Header token={token}   ></Header>

				<Outlet />
                <ToastContainer />
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>

                    <UserNavigationLinks />

			</div>
		</div>
	);
}



function UserNavigationLinks(props) {

    const {deleteToken} = useToken()

    const navigate = useNavigate()

    function logout(){
        
        api.post('/logout')
        .then(({data}) => {
            
            deleteToken()
            navigate('/login')
        })
        .catch(er => {
            console.log(er)
        })
    }


	return (
        <ul className='menu p-4 w-3/5 bg-base-100 text-base-content'  >
            
            <li><Link to="/account">Home</Link></li>
            <li><Link to="/account/balance">Balance</Link></li>
            <li><Link to="/account/deposit">Deposit</Link></li>
            <li><Link to="/account/send">Send</Link></li>
            <li><Link to="/account/transfer">Transfer</Link></li>
            <li><span onClick={logout}>Logout</span></li>
        </ul>
	);
}

