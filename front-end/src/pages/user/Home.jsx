import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { store } from "../../App";

function Home() {

    // console.log(store)

    // 
    // useEffect(() => {
    //     store.getInitialBalance()
    // }, [])

	

	return (
		<div className="bg-white rounded-md shadow  mx-auto w-11/12  lg:w-4/5 border lg:p-4 p-2 my-5 flex-1">
			<h3 className="m-2 text-2xl font-bold">Welcome {store.name}.</h3>

            <h3 className="text-2xl my-5">Account Balance:   <b className="">${store.balance}</b></h3>
			
           
		</div>
	);
}

export default observer(Home);
