import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMyListReducer, orderPayReducer } from './reducers/orderReducers';

import { 
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer, 
    productListReducer, 
    productUpdateReducer
} from './reducers/productReducers';
import { 
    userDetailsReducer,
    userRegisterReducer, 
    userSigninReducer,
    userUpdateProfileReducer
 } from './reducers/userReducer';


const initialState={ 
    userSignin:{
        userInfo:localStorage.getItem('userInfo')
         ? JSON.parse(localStorage.getItem('userInfo'))
         :null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress:localStorage.getItem('shippingAddress') ? 
        JSON.parse(localStorage.getItem('shippingAddress'))
        :{},
        paymentMethod:'Paypal'
    }
};

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList:orderMyListReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productDelete:productDeleteReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer,
    orderDeliver:orderDeliverReducer
})

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composerEnhancer(applyMiddleware(thunk))
);



export default store