import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMy } from '../actions/orderActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  
    const userSignin=useSelector((state)=>state.userSignin);
    const {userInfo}=userSignin

  const dispatch = useDispatch();
 
  useEffect(() => {
      if(!userInfo){
           props.history.push('/') 
        }
    dispatch(listOrderMy());
  }, [props.history, dispatch, userInfo]);
  return (
    <div>
      <h1>Order History</h1>
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
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                
                   <td>
                    {order.isPaid
                    ?(<i className='fa fa-check' style={{color:'green'}}> Paid At {order.paidAt.substring(0, 10)}</i> )
                    : (<i className='fa fa-times' style={{color:'red'}}></i>)}
                    
                   </td>
                
                <td>
                  {order.isDelivered
                    ?(<i className='fa fa-check' style={{color:'green'}}></i>)
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
