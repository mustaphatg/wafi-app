import React from "react";
import { observer } from "mobx-react-lite";
import { store } from "../../App";



 function Balance() {
	return (
		<div className="bg-white rounded-md shadow  mx-auto w-11/12  lg:w-4/5 border lg:p-4 p-2 my-5 flex-1">
			
            <h3 className="m-2 text-2xl font-bold text-center underline">Account Balance</h3>

            <div className="flex justify-center items-center h-3/5">
                <p className="font-bold bg-gray-200 p-10 rounded text-xl">${store.balance}</p>
            </div>
		

			
		</div>
	);
}




export default observer(Balance);