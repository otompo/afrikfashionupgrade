
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';


function App() {

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const userSignin= useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    
    
    const signoutHandler=()=>{
        dispatch(signout())
    }



  return (

    <BrowserRouter>
     <div className="App">    
        <div className="grid-container">
                {/* ***************Header Section Start*********************** */}
                <header className="row">
                    <div>
                        <Link className="brand" to="/">AfrikFashion</Link>
                    </div>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/cart">Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        {
                            userInfo ? (
                                <div className="dropdown">
                                     <Link to="#">
                                        {userInfo.name} <i className="fa fa-caret-down"></i>
                                     </Link>
                                    
                                    <ul className="dropdown-content">
                                        <li>
                                           <Link to='/profile'>User Profile</Link> 
                                        </li>
                                        <li>
                                           <Link to='/orderhistory'>Order History</Link> 
                                        </li>
                                        <li>
                                            <Link to="/" onClick={signoutHandler}>
                                                Sign Out
                                            </Link>

                                        </li>
                                    </ul>
                                </div>                            
                            ):
                             <Link to="/signin">
                            Sign In
                            </Link>
                        }
                        {
                            userInfo && userInfo.isAdmin &&(
                                <div className="dropdown">
                                    <Link to="#admin">
                                        Admin {' '} <i className="fa fa-caret-down"></i>
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li>
                                           <Link to='/dashboard'>Dashboard</Link> 
                                        </li>
                                        <li>
                                           <Link to='/productlist'>Products</Link> 
                                        </li>
                                        <li>
                                           <Link to='/orderlist'>Orders</Link> 
                                        </li>
                                        <li>
                                           <Link to='/userlist'>Users</Link> 
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                       
                    </div>
                </header>
                 {/* ***************Header Section Ends*********************** */}

                {/* ***************Main Section Start*********************** */}
                <main>
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact />                     
                    <Route path='/product/:id' component={ProductScreen} exact/>
                    <Route path='/signin' component={SigninScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/shipping' component={ShippingAddressScreen} />
                    <Route path='/payment' component={PaymentMethodScreen}/>
                    <Route path='/placeorder' component={PlaceOrderScreen}/>
                    <Route path='/order/:id' component={OrderDetailsScreen}/>
                    <Route path='/orderhistory' component={OrderHistoryScreen}/>
                    <PrivateRoute path='/profile' component={ProfileScreen}/>
                    <AdminRoute path='/productlist' component={ProductListScreen}/>
                    <AdminRoute path='/product/:id/edit' component={ProductEditScreen}/>
                    <AdminRoute path='/orderlist' component={OrderListScreen} />

                </main>
            {/* ***************Main Section Ends*********************** */}

            {/* ***************Footer Section Start*********************** */}
            <footer className="row center">
                All rigth reserved
            </footer>
            {/* ***************Footer Section Ends*********************** */}
        </div>
     </div>
    </BrowserRouter>
  );
}

export default App;
