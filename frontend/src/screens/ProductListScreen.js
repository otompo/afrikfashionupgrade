import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createProduct, deletedProduct, listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'


export default function ProductListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const{loading, error, products}=productList

    const productCreate = useSelector(state => state.productCreate)
    const{loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct}=productCreate

    const productDelete = useSelector(state => state.productDelete)
    const{loading:loadingDelete, error:errorDelete, success:successDelete}=productDelete

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo}=userSignin
    


    useEffect(() => {
        if(successCreate){
            dispatch({type:PRODUCT_CREATE_RESET})
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({
                type:PRODUCT_DELETE_RESET
            })
        }
        
       dispatch(listProducts({seller: sellerMode?userInfo._id:''}))

    }, [
        dispatch, 
        props.history, 
        successCreate,
        userInfo._id, 
        sellerMode, 
        createdProduct, 
        successDelete
    ])

    const deleteHandler=(product)=>{
        if(window.confirm(`Are You Sure to Delete ${product.name}` )){

            dispatch(deletedProduct(product._id))
        }
    }

    const createHandler=()=>{
        dispatch(createProduct())
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button className='primary' type='button' onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete }</MessageBox> }
            
            {loadingCreate  && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            {loading ? <LoadingBox></LoadingBox>
            :error ? <MessageBox variant="danger">{error}</MessageBox>
            :(
              <table className="table">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>NAMAE</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th>ACTION</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product, counter)=>(
                          <tr key={product._id}>
                              <td>{counter+1}</td>
                              <td>{product._id}</td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td>
                                  <button type="button" className="edit"
                                  onClick={()=>props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                   <button type="button" className="danger"
                                  onClick={()=>deleteHandler(product)}>Delete</button>
                              </td>
                          </tr>
                          
                      ))}
                  </tbody>
              </table>  
            )
            }
        </div>
    )
}
