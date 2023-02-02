import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { store } from "../../App";
import { useEffect } from "react";
import { api } from "../../util/api";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';





export default function Send() {

	// recipient name
	const [recipient_name, setName] = useState("");

	// recipient email
	const [recipient_email, setEmail] = useState("");

	// amount
	const [amount_to_send, setAmount] = useState("");

	// error
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	// set data value of email and name
	function handleChange(e) {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	}

	//set amount value
	function handleAmountChange(e) {
		var value = parseInt(e.target.value);

		if (isNaN(value)) {
			setAmount("");
		} else {
			value = value >= 0 ? value : 0;
			setAmount(value);
		}
	}

	// check name of user if email changes
	useEffect(
		function () {
			api.get("/send?email=" + recipient_email)
				.then(({ data }) => {
					if (data.name) {
						// update the recipient name
						setName(data.name);
						setError(null);
					}
				})
				.catch((er) => {
					if (recipient_email != "") {
						if (er.response.data && er.response.data.error) {
							setError(er.response.data.msg);
							setName("");
						}
					}
				});
		},
		[recipient_email]
	);

	// send money
	function send_money() {
		// mini validation
		if (recipient_email == "") {
			toast.error("The recipiene email is invalid");
			return;
		}
		if (recipient_name == "") {
			toast.error("The recipiene name is invalid");
			return;
		}
		if (amount_to_send == "" || amount_to_send <= 0) {
			toast.error("The amount is invalid");
			return;
		}

		// make request
		api.post("/send", { recipient_email, recipient_name, amount_to_send })
			.then(({ data }) => {
				console.log(data);

				if (data.type && data.type == "success") {

                    toast.success('Sent')
					store.getInitialBalance();
					navigate("/account");
				}
			})
			.catch((er) => {
				console.log(er.response.data);
			});
	}

	return (
		<div className="bg-white rounded-md shadow  mx-auto w-11/12  lg:w-4/5 border lg:p-4 p-2 my-5 flex-1">
			<h3 className="m-2 text-2xl font-bold  text-center">
				Send Money To A User
			</h3>


			<div className="flex flex-col w-1/3 mx-auto justify-center items-center">
				{/* recipienct email */}
				<input
					type="text"
					name="recipient_email"
					onChange={(e) => setEmail(e.target.value)}
					value={recipient_email}
					placeholder="Recipient Email"
					className="my-3 input input-bordered w-full max-w-xs"
				/>

				{/* recipienct name */}
				<input
					type="text"
					name="recipient_name"
					value={recipient_name}
					placeholder="Recipient Name"
					disabled
					className="my-3 input input-bordered w-full max-w-xs"
				/>

				{/* error */}
				{error ? <p className="text-red-900">{error}</p> : ""}

				{/* amount to send */}
				<input
					type="number"
					name="amount_to_send"
					value={amount_to_send}
					onChange={handleAmountChange}
					placeholder="Amount to send"
					className="my-3 input input-bordered w-full max-w-xs"
				/>

				{/* send button */}
				<button className="btn btn-block my-3 " onClick={send_money}>
					Send
				</button>
			</div>
		</div>
	);
}
