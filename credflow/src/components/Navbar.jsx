import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/"><img src="https://winestore-online.com/Themes/Winestore/Assets/images/winestore-logo.svg" alt="logo"/></Link>
            <div>
                <Link to="/wishlist"><CgProfile style={{fontSize:"35px",cursor:"pointer"}}/></Link>
                <Link to="/cart"><AiOutlineShoppingCart style={{fontSize:"35px"}}/></Link>
            </div>
        </div>
    )
}