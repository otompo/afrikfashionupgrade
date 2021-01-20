
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';


function App() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const userSignin= useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    
    const dispatch = useDispatch()
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
                                     <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                                    <ul className="dropdown-content">
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </ul>
                                </div>                            
                            ):
                             <Link to="/signin">
                            Sign In
                            </Link>
                        }
                       
                    </div>
                </header>
                 {/* ***************Header Section Ends*********************** */}

                {/* ***************Main Section Start*********************** */}
                <main>
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact />                     
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/signin' component={SigninScreen} />
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
