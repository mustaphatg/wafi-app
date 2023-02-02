import { makeObservable, observable, computed, action, runInAction } from "mobx";
import {api} from './api'

class User {

    email = ''
    balance =  0
    name = ''

    constructor(){
        makeObservable(this, {
            email : observable,
            balance : observable,
            name : observable,
            depositMoney : action.bound,
            sendMoney : action.bound,
            transferMoney : action.bound,
            getInitialBalance : action.bound


        })
        
        runInAction(() => this.getInitialBalance())

    }


    // get initial data
    async getInitialBalance(){

        try {
            var data = await api.get('/profile')
            data = await data.data

            runInAction(() => {
                this.email = data.email
                this.name  = data.name
                this.balance  = data.balance
            })
           
    
        }
        catch(er){
            console.log(er)
        }
        
       
    }

   

    // deposit money into your wallet
    depositMoney(amount){

        var amount = parseInt(amount)

        api.post('/deposit', {amount})
        .then(({data}) => {

            // console.log(data)
            this.getInitialBalance()
            // this.balance = parseInt(this.balance) + parseInt(amount)
        })
        .catch(er => {

        })
    }


    // send money to another user
    sendMoney(){

    }


    // transfer money to your bank
    transferMoney(){

    }


}


export default User
