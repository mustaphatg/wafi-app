import React, {useState} from "react";
import {toast } from 'react-toastify';
import { api } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { store } from "../../App";


    


export default function Transfer() {

    // amount to transfer 
    const [amount_to_transfer, setAmount] = useState('')

	const navigate = useNavigate();

    function handleAmountChange(e){

        var value = parseInt(e.target.value)

        if(isNaN(value)){
            setAmount('')
        }else{
            value = value >= 0 ? value : 0;
            setAmount(value)
        }
    }


    // transfer money
    function transfer_money(){
        if(amount_to_transfer == "" || amount_to_transfer <= 0){
            toast.error("The amount to transfer is invalid")
            return
        }


        api.post('/transfer', {amount_to_transfer})
        .then(({data}) => {

            if(data.msg){
                toast.success(data.msg)
                store.getInitialBalance();
                navigate('/account')
            }
        })
        .catch(er => {
            console.log(er.response.data)
            toast.error("An error occured when processing your request")
        })


    }


	return (
		<div className="bg-white rounded-md shadow  mx-auto w-11/12  lg:w-4/5 border lg:p-4 p-2 my-5 flex-1">
			<h3 className="m-2 text-2xl font-bold  text-center">
				Trsanfer Money
			</h3>

			<div className="flex flex-col w-1/3 mx-auto justify-center items-center">
				{/* amount  */}
				<input
					type="number"
					name="amount_to_transfer"
					onChange={(e) => handleAmountChange(e)}
					value={amount_to_transfer}
					placeholder="Amount to transfer"
					className="my-3 input input-bordered w-full max-w-xs"
				/>

				
				{/* send button */}
				<button className="btn btn-block my-3 " onClick={transfer_money}>
					Transfer
				</button>
			</div>
		</div>
	);
}
