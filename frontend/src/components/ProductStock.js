import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detailsProduct } from '../actions/productActions';

export default function ProductStock(props) {
    const dispatch = useDispatch()
    // const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const {product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct());    
        
      }, [dispatch]);
    return (
        <div>
            {product.countInStock > 0 ?
               (
                <span className="success">In Stock</span>
                ) : (
                <span className="danger">
                   Out of Stock
                </span>
            )} 
        </div>
    )
}
