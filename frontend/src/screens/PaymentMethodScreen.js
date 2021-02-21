import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {

        const cart = useSelector(state => state.cart)
        const{shippingAddress}=cart
        if(!shippingAddress.address){
              props.history.push('/shipping')   
        }
        const dispatch = useDispatch()
        const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>

                <div>
                    <div>
                        <input 
                        type="radio" 
                        id='paypal' 
                        value='PayPal'
                        name='paymentMethod'
                        required checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>

                <div>
                    <div>
                        <input 
                        type="radio" 
                        id='momo' 
                        value='Mobile Money'
                        name='paymentMethod'                    
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='momo'>Mobile Money</label>
                    </div>
                </div>

                <div>
                    <div>
                        <input 
                        type="radio" 
                        id='cashondelivery' 
                        value='Cash on Delivery'
                        name='paymentMethod'                    
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='cashondelivery'>Cash on Delivery</label>
                    </div>
                </div>

                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}

