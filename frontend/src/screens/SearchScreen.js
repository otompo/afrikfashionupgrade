import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams } from 'react-router-dom';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import Product from './../components/Product';

import { prices, ratings } from '../utils';
import Ratting from '../components/Rating';

export default function SearchScreen(props) {

  const { 
    name = 'all', 
    category = 'all', 
    min=0, 
    max=0, 
    rating=0,
    order='newest'

  } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;





    
    useEffect(() => {
      dispatch(
        listProducts({
          name: name !== 'all' ? name : '',
          category: category !== 'all' ? category : '',
          min,
          max,
          rating,
          order
        })
      );
    }, [category, dispatch, name, min, max, rating, order]);
  
    const getFilterUrl = (filter) => {
      const filterCategory = filter.category || category;
      const filterName = filter.name || name;
      const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;

      const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
      const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
      return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };

    return (
        <div>
            <div className="row">
                {loading ? (<LoadingBox></LoadingBox>
                ):
                error ? (<MessageBox variant="danger">{error}</MessageBox>
                ):
                (<div style={{padding:'20px', fontSize:'20px', fontWeight:'bold', color:"brown"}}>
                    {products.length} Result
                </div>
                )} 
                <div>
                  Sort by {' '}
                  <select value={order}
                  onChange={(e)=>{
                    props.history.push(getFilterUrl({order: e.target.value}))
                  }}
                  >
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="toprated">Newest Arrivals</option>
                  </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    <div>
                          {loadingCategories ? (
                          <LoadingBox></LoadingBox>
                            ) : errorCategories ? (
                              <MessageBox variant="danger">{errorCategories}</MessageBox>
                            ) : (
                          <ul>
                            <li>
                            <Link
                                  className={'all' === category ? 'active' : ''}
                                  to={getFilterUrl({ category: 'all' })}
                                >
                                  Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                              <li key={c}>
                                <Link
                                  className={c === category ? 'active' : ''}
                                  to={getFilterUrl({ category: c })}
                                >
                                  {c}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                    <div>
                    <h3>Price</h3>   
                      <ul>
                        {prices.map((price)=>(
                          <li key={price.name}>
                              <Link 
                              to={getFilterUrl({min:price.min, max:price.max})}
                              className={`${price.min}-${price.max}`===`${min}-${max}`?'active':''}
                              >
                                {price.name}
                              </Link>
                          </li>
                        ))}
                      </ul>        
                    </div>       
                  {/* *********************************************************** */}
                    <div>
                    <h3>Average Customer Review</h3>   
                      <ul>
                        {ratings.map((r)=>(
                          <li key={r.name}>
                              <Link 
                              to={getFilterUrl({rating:r.min})}
                              className={`${r.rating}` === `${rating}` ? 'active':''}
                              >
                               <Ratting caption={"& up"} rating={r.rating}></Ratting>
                              </Link>
                          </li>
                        ))}
                      </ul>        
                    </div>                   
                </div>
                <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              
            </>
          )}
        </div>
            </div>
        </div>
    )
}
