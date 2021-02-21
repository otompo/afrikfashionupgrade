import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions'
import {PayPalButton}  from 'react-paypal-button-v2'

import Axios from 'axios'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'

export default function OrderDetailsScreen(props) {
   const orderId=props.match.params.id
   const dispatch= useDispatch()
   const [sdkReady, setsdkReady]=useState(false)

   const orderDetails = useSelector(state => state.orderDetails)
   const {loading, error, order}=orderDetails
   
   const orderPay = useSelector(state => state.orderPay)
   const {loading:loadingPay, success:successPay, error:errorPay}=orderPay
    
   const userSignin = useSelector(state => state.userSignin)
   const {userInfo}=userSignin

   const orderDeliver = useSelector(state => state.orderDeliver)
   const {loading:loadingDeliver, error:errorDeliver, success:successDeliver}=orderDeliver


    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data}=await Axios.get('/api/config/paypal')
            const script=document.createElement('script')
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
            script.async=true
            script.onload=()=>{
                setsdkReady(true);
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver || (order && order._id !== orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId))
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setsdkReady(true)
                }
            }
        }

       
    }, [dispatch, order, sdkReady, orderId, successPay, successDeliver])

   const successPaymentHanler=(paymentResult)=>{
        dispatch(payOrder(order, paymentResult))
   }

   const deliverHandler=()=>{
      dispatch(deliverOrder(order._id))  
   }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (

        <div>
          <h1>Order: {order._id}</h1>
           <div className="row top">
               
               <div className="col-2">
                 <ul>
                 <li>
                 {
                     order.isPaid &&(
                     <Link to='/orderhistory' className="row center shopping">Order History</Link>

                     )
                 }
                 </li>
                     <li>
                        <div className='card card-body'>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong>
                            {order.shippingAddress.fullName}<br/>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, 
                            {order.shippingAddress.city}
                            {order.shippingAddress.postalcode},
                            {order.shippingAddress.country},
                            <br/>
                        </p>
                        {order.isDelivered? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                        :
                        <MessageBox variant="danger">Not Delivered</MessageBox>
                        }
                        </div>
                     </li>

                     <li>
                        <div className='card card-body'>
                        <h2>Payment </h2>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}                    
                            <br/>
                        </p>
                         {order.isPaid? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                        :
                        <MessageBox variant="danger">Not Paid</MessageBox>
                        }
                        </div>
                     </li>
                     <li>
                        <div className='card card-body'>
                        <h2>Order Items </h2>
                         <ul>              
                            {order.orderItems.map((item)=>(
                                <li key="item.product">
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small" />
                                        </div>

                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>  

                                        <div>{item.qty} x GH&#8373; {item.price}=GH&#8373; {item.qty * item.price} </div>                       
                                    </div>
                                </li>
                            ))}
                            <Link to='/' className="row center shopping">Continue Shopping</Link>
                        </ul>   
                        </div>
                     </li>
                 </ul>
               </div>
                
                 <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summery</h2>
                            </li>

                            <li>
                              <div className="row">
                              <div>Items</div>
                              <div>GH&#8373; {order.itemsPrice.toFixed(2)}</div>
                              </div>  
                            </li>

                            <li>
                              <div className="row">
                              <div>Shipping</div>
                              <div>GH&#8373; {order.shippingPrice.toFixed(2)}</div>
                              </div>  
                            </li>

                            <li>
                              <div className="row">
                              <div>Tax</div>
                              <div>GH&#8373; {order.taxPrice.toFixed(2)}</div>
                              </div>  
                            </li>

                            <li>
                              <div className="row">
                              <div> <strong>Order Total</strong></div>
                              <div><strong>GH&#8373; {order.totalPrice.toFixed(2)}</strong></div>
                              </div>  
                            </li>  
                            
                            <li>
                                {
                                         
                                    !order.isPaid && (
                                        order.paymentMethod ==="PayPal"? 
                                        <li>
                                        {!sdkReady?(<LoadingBox></LoadingBox>):
                                            (
                                                <>
                                                {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                {loadingPay && <LoadingBox></LoadingBox>}
                                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHanler}></PayPalButton>

                                                </>
                                            )}
                                        </li>
                                        : order.paymentMethod ==="Mobile Money"?
                                        <li>
                                        <button type="submit" className="primary block"> Mobile Money</button>
                                        </li>
                                            : 
                                        <li>
                                            <button type="submit" className="primary block">Cash on Delivery</button>
                                        </li>                                 
                                    )                                   
                                        
                                }
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={deliverHandler}
                                     >
                                        Deliver Order
                                    </button>
                </li>
              )}
                            </li>                                                         
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        
                        </ul>
                    </div>

                    <div className="card card-body">
                        <ul>
                           <li>
                               <div className="row">
                                   <div><i className="fa fa-lock"></i> </div>
                                   <div>
                                        <h2>Payment 100% secured</h2>
                                        <p>Your payment is secured with the strongest finance protocols</p>
                                   </div>
                                   
                               </div>     
                            </li>
                        </ul>            
                    </div>

                    <div className="card card-body">
                        <ul>
                           <li>
                               <div className="row">
                                   <div><i className="fa fa-refresh fa-3x"></i></div>
                                   <div>
                                        <h2>Money back guarantee</h2>
                                        <p>We guarantee your money back if you are not satisfied</p>
                                   </div>
                                   
                               </div>     
                            </li>
                        </ul>            
                    </div>
                 </div>     
                </div>
            </div>
        )
}
