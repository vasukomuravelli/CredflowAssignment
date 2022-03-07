import React from 'react'
import { cartApi } from "../context/CartApi"
import {wishlistApi} from "../context/WishlistApi"
import { AiFillStar } from "react-icons/ai"
import {Button} from "antd"


export const Cart = () => {
    const { cart, deleteCart } = React.useContext(cartApi);
    const { handleWishlist } = React.useContext(wishlistApi);
    const addToWishlist = (e) => {
        handleWishlist(e);
        deleteCart(e.wine);
    }
    if (cart.length > 0) {
        return (
            <div>
                <h1>Welcome to cart page</h1>
                {cart.map((e) => {
                    return (
                        <div key={e.id} className="cartProduct">
                        <div>
                            <img src={e.image} alt={e.wine} />
                        </div>
                        <div>
                            <h2>{e.wine}</h2>
                            <p>Location : {e.location}</p>
                            <p>Rating : {e.rating.average} <AiFillStar style={{color:"rgb(249,158,0)"}}/></p>
                            <p>{e.rating.reviews.split(' ')[0]} Reviews</p>
                        </div>
                        <div>
                            <Button onClick={()=>addToWishlist(e)} type="primary">Save for later</Button><br/>
                            <Button onClick={()=>deleteCart(e.wine)} type="primary" danger>Delete </Button>
                        </div>
                    </div>)
                })}
            </div>
        )
    } else {
        return <div>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="emptyCart" />
        </div>
    }
}
