import React from 'react'
import { cartApi } from "../context/CartApi"
import {wishlistApi} from "../context/WishlistApi"
import {Button} from "antd"
import { AiFillStar } from "react-icons/ai"

export const Wishlist = () => {
    const { handleCart } = React.useContext(cartApi);
    const { wishlist,deleteWishlist } = React.useContext(wishlistApi);
    const addTocart = (e) => {
        handleCart(e);
        deleteWishlist(e.wine);
    }
    if (wishlist.length > 0) {
        return (
            <div>
                <h1>Welcome to Wishlist page</h1>
                {wishlist.map((e) => {
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
                        <div style={{marginTop:"2%"}}>
                            <Button onClick={()=>addTocart(e)} type="primary" >Add To Cart</Button><br/>
                            <Button onClick={()=>deleteWishlist(e.wine)} type="primary" danger>Delete </Button>
                        </div>
                    </div>)
                })}
            </div>
        )
    } else {
        return <div>
            <img src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png" alt="emptyWishlist" />
        </div>
    }
}
