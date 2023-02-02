import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { store } from "../../App";
import {toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";






 function Deposit() {
	const [amount, setAmount] = useState('');

	const navigate = useNavigate();


    function setValue(e){
        var value = parseInt(e.target.value)

        if(isNaN(value)){
            setAmount('')
        }else{
            value = value >= 0 ? value : 0;
            setAmount(value)
        }
    }


	// deposit
	const deposit = () => {
       
        if(amount == "" || amount <=0 ){
            toast.error('Amount is invalid')
        }else{
            store.depositMoney(amount)
            toast.success('Deposit successful')
            setAmount(0)
            navigate('/account')

        }
       
    };


	return (
		<div className="bg-white rounded-md shadow  mx-auto w-11/12  lg:w-4/5 border lg:p-4 p-2 my-5 flex-1">
			<h3 className="m-2 text-2xl font-bold  text-center">
				Deposit Money
			</h3>

			<div className="flex flex-col w-1/3 mx-auto justify-center items-center">

				{/* amount */}
				<input
					type="number"
					name="amount"
					onChange={setValue}
					value={amount}
					placeholder="Amount"
					className="my-3 input input-bordered w-full max-w-xs"
				/>

				{/* deposit */}
				<button className="btn btn-block" onClick={deposit}>
					Deposit
				</button>

			</div>

		</div>
	);
}

export default observer(Deposit)
