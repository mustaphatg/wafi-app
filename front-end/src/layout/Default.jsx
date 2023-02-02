import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import {ToastContainer } from 'react-toastify';


export default function Default() {
	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col">
				<Header ></Header>

				<Outlet  />
                <ToastContainer />

			</div>

			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 bg-base-100 text-base-content">
					
				</ul>
			</div>
		</div>
	);
}
