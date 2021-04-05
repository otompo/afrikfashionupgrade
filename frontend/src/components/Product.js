import React from 'react'
import Rating from './Rating'
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'

export default function Product(props) {
    
const {product} =props
    return (
      
        <Fade bottom cascade>
            <div  className="card">
                <Link to={`/product/${product._id}`}>
                    <img className="medium" src={product.image} alt={product.name} />
                </Link>
                <div className="card-body">
                    <Link to={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </Link>
                    <Rating
                        rating={product.rating} 
                        numReviews={product.numReviews}
                    />  
                    <div className="row">
                        <div className="price">GH&#8373; {product.price}</div>
                        <div>
                        <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                        </Link>
                        </div>
                    </div>               
                </div>
            </div>
        </Fade>
     
    )
}
