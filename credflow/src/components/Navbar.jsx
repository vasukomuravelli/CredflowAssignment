import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import {Link} from "react-router-dom"
import { cartApi } from "../context/CartApi"

export const Navbar = () => {
    const { cart } = React.useContext(cartApi);
    return (
        <div className="navbar">
            <Link to="/"><img src="https://winestore-online.com/Themes/Winestore/Assets/images/winestore-logo.svg" alt="logo"/></Link>
            <div>
                <Link to="/wishlist"><CgProfile style={{ fontSize: "35px", cursor: "pointer",color: "grey" }} /></Link>
                <div className="cart">
                    <Link to="/cart"><AiOutlineShoppingCart style={{fontSize:"35px",color: cart.length>0 ? "blue" : "grey"}}/></Link>
                    <div>{cart.length}</div>
                </div>
            </div>
        </div>
    )
}