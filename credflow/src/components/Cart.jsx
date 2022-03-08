import React from 'react'
import { cartApi } from "../context/CartApi"
import {wishlistApi} from "../context/WishlistApi"
import { AiFillStar } from "react-icons/ai"
import {Button,Modal,Input} from "antd"


export const Cart = () => {
    const { cart, deleteCart } = React.useContext(cartApi);
    const { handleWishlist } = React.useContext(wishlistApi);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [address,setAddress] = React.useState({});
    const addToWishlist = (e) => {
        handleWishlist(e);
        deleteCart(e.wine);
    }
    const handleOk = () => {
        if (Object.keys(address).length >= 5) {
            setIsModalVisible(false);
            Modal.success({
                content: `Thanks for shopping, you will receive your order with orderId ${Math.floor(Math.random()*100000)} soon 😍`,
            });
            while (cart.length) {
                cart.length--;
            }
        }
        else {
            alert(" Please fill out all the fields");
        }
    }
    const handleChange = (e) => {
        const {id,value} = e.target;
        setAddress({...address,[id] : value})
    }
    if (cart.length > 0) {
        return (
            <div style={{display: 'flex'}} className="cartPage">
                <div>
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
                <div>
                    <p>Total Quantity : {cart.length}</p>
                    <Button onClick={()=>setIsModalVisible(true)}>Check Out</Button>
                    <Modal title="Please fill your Address" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
                        <Input type="text" placeholder="Enter your House Number" id="HNO" required onChange={(e)=>handleChange(e)}/><br/><br/>
                        <Input type="text" placeholder="Enter your District" id="district" required onChange={(e)=>handleChange(e)}/><br/><br/>
                        <Input type="text" placeholder="Enter your State" id="state" required onChange={(e)=>handleChange(e)}/><br/><br/>
                        <Input type="Number" placeholder="Enter your Pincode" id="Pincode" required onChange={(e)=>handleChange(e)}/><br/><br/>
                        <Input type="Number" placeholder="Enter your Phone Number" id="phone" required onChange={(e)=>handleChange(e)}/><br/><br/>
                    </Modal>
                </div>
            </div>
        )
    } else {
        return <div>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="emptyCart" />
        </div>
    }
}
