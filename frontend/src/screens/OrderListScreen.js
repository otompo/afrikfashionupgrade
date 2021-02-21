import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'


export default function OrderListScreen(props) {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const{loading, error, orders}=orderList
    
    const orderDelete = useSelector(state => state.orderDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete}=orderDelete
    
    useEffect(() => {
        
        dispatch(listOrders()) 
        dispatch({
            type:ORDER_DELETE_RESET
        })       
    }, [dispatch, successDelete])

    const deleteHandler=(order)=>{
       if(window.confirm(`Are you sure to Delete? ${order._id}`)){
           dispatch(deleteOrder(order._id))
       }
    }
    var today = new Date();
    today.toISOString().substring(0, 10);

    return (
         <div>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL GH&#8373;</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, counter) => (
              <tr key={order._id}>
                <td>{counter+1}</td>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>                
                   <td>
                    {order.isPaid
                    ?(<i className='fa fa-check' style={{color:'green'}}> Paid At {order.paidAt.substring(0, 10)}</i> )
                    : (<i className='fa fa-times' style={{color:'red'}}></i>)}
                    
                   </td>
                
                <td>
                  {order.isDelivered
                    ?(<i className='fa fa-check' style={{color:'green'}}> Delivered At {order.deliveredAt.substring(0, 10)}</i>)
                    : (<i className='fa fa-times' style={{color:'red'}}></i>)}
                    
                  {/* {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'} */}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={()=>deleteHandler(order)}                
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}
