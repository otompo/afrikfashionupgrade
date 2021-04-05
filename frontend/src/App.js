import { useEffect, useState } from 'react';
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
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

import { listProductsCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';


function App() {

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;
    const [sidebarIsOpen, setSidebarIsOpen] = useState()
    const userSignin= useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

  
    
    const signoutHandler=()=>{
        dispatch(signout())
    }
useEffect(() => {
    dispatch(listProductsCategories())
    
}, [dispatch])

  return (

    <BrowserRouter>
     <div className="App">    
        <div className="grid-container">
                {/* ***************Header Section Start*********************** */}
                <header className="row">
                    <div>
                        <button
                        type="button"
                        className="open-sidebar"
                        onClick={()=>setSidebarIsOpen(true)}
                        >
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link className="brand" to="/">AfrikFashion</Link>
                    </div>
                    <div>
                    <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                    ></Route>
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


                        {userInfo && userInfo.isSeller &&(
                            <div className="dropdown">
                            <Link to="#admin">
                                Seller <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">                             
                                <li>
                                   <Link to='/productlist/seller'>Products</Link> 
                                </li>
                                <li>
                                   <Link to='/orderlist/seller'>Orders</Link> 
                                </li>

                            </ul>
                        </div>
                        )}
                       
                        
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

                 <aside className={sidebarIsOpen ? 'open':''}>                  
                   
                    <ul className="categories">
                        <li>
                            <strong>Categories</strong>
                            <button onClick={()=>setSidebarIsOpen(false)}
                        className="close-sidebar">
                            <i className="fa fa-close"></i>
                        </button>
                        </li>
                        {loadingCategories ? (
                    <LoadingBox></LoadingBox>
                      ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                      ) : (
                    <ul>
                      {categories.map((c) => (
                        <li key={c}>
                          <Link                           
                            to={`/search/category/${c}`}
                            onClick={()=>setSidebarIsOpen(false)}
                          >
                            {c}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                    </ul>
                 </aside>

                {/* ***************Main Section Start*********************** */}
                <main>
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/category/:id' component={HomeScreen} />
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
                    <PrivateRoute path='/product/:id/edit' component={ProductEditScreen}/>
                    <AdminRoute path='/productlist' component={ProductListScreen} exact/>
                    {/* <AdminRoute path='/product/:id/edit' component={ProductEditScreen}/> */}
                    <AdminRoute path='/orderlist' component={OrderListScreen} exact/>
                    <AdminRoute path='/userlist' component={UserListScreen} />
                    <AdminRoute path='/user/:id/edit' component={UserEditScreen} />
                    <SellerRoute path="/productlist/seller" component={ProductListScreen}/>
                    <SellerRoute path="/orderlist/seller" component={OrderListScreen}/>
                    <Route path="/seller/:id" component={SellerScreen}/>
                    <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
                     <Route path="/search/category/:category" component={SearchScreen} exact></Route>
                     <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
                     <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact></Route>
                     <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
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
