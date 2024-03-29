import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';


export default function HomeScreen(props) {
  // const [searchKeyword, setSearchKeyword] = useState('')
  // const [sortOrder, setSortOrder] = useState('')
  // const category=props.match.params.id ? props.match.params.id :'';
  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellerList = useSelector((state) => state.userTopSellerList);
  const { 
    loading:loadingSellers, 
    error:errorSellers, 
    users:sellers 
  } = userTopSellerList;


  const dispatch = useDispatch()

//   const submitHandler=(e)=>{
//   e.preventDefault();
//   dispatch(listProducts(category, searchKeyword, sortOrder))
// }

// const sortHandler=(e)=>{
//   // e.preventDefault()
//   setSortOrder(e.target.value)
//   dispatch(listProducts(category, searchKeyword, sortOrder))
// }

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers({}));
  }, [dispatch]);
  
  return (  
      <>
      {/* <h2>Top Sellers</h2> */}
      {loadingSellers ? (
            <LoadingBox></LoadingBox>
          ) : errorSellers ? (
            <MessageBox variant="danger">{errorSellers}</MessageBox>
          ) : (
            <>
              {
              sellers.length===0 && <MessageBox>No Seller Found</MessageBox>
              }

              <Carousel showArrows autoPlay showThumbs={false} showStatus={false}>
                {sellers.map((seller)=>(
                  <div key={seller._id}>
                      <Link to={`/seller/${seller._id}`}>
                        <img src={seller.seller.logo} alt={seller.seller.name}/>
                         <p className='legend'  style={{fontSize:'30px', backgroundColor:'brown'}}>{seller.seller.name}</p>
                      </Link>
                  </div>
                ))}
              </Carousel>
           </>
          )}
      {/* <h2>Featured Products</h2> */}
      
       
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {
            products.length===0 && <MessageBox>No Product Found</MessageBox>
            }
            <div className="row center">
                {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
         </>
          )}
      </>
   
  );
}