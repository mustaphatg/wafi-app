import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../util/useToken";
import {api} from '../util/api'


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
		<div className="flex-none hidden lg:block">
			<ul className='menu menu-horizontal px-1'  >
				
                <li><Link to="/account">Home</Link></li>
                <li><Link to="/account/balance">Balance</Link></li>
                <li><Link to="/account/deposit">Deposit</Link></li>
                <li><Link to="/account/send">Send</Link></li>
                <li><Link to="/account/transfer">Transfer</Link></li>
				<li><span onClick={logout}>Logout</span></li>
			</ul>
		</div>
	);
}


export default function Header(props) {
	return (
		<div className="navbar bg-base-100 shadow">
			<div className="flex-none">
				<label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-5 h-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
			</div>

			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">Payment App</a>
			</div>


			{/* display user navigation link if toke is avaialable */}
			{props.token ? <UserNavigationLinks  /> : '' }

		</div>
	);
}
