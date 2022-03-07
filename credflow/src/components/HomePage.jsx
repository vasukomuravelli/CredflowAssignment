import React from "react";
import axios from "axios";
import { cartApi } from "../context/CartApi"
import { AiFillStar } from "react-icons/ai"
import {Button} from "antd"

export const HomePage = () => {
    const [data, setData] = React.useState([]);
    const { handleCart } = React.useContext(cartApi);
    const [query, setQuery] = React.useState("reds");
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        axios.get(`https://api.sampleapis.com/wines/${query}`).then(response => setData(response.data));
        setLoading(false);
    }, [query]);
    return (
        loading ? <div>Loading...</div> :
        <div>
            <h1>Welcome to wine gallery</h1>
            <div className="categories">
                <p onClick={()=>setQuery("reds")}>Reds</p>
                <p onClick={()=>setQuery("whites")}>Whites</p>
                <p onClick={()=>setQuery("sparkling")}>Sparkling</p>
                <p onClick={()=>setQuery("rose")}>Rose</p>
                <p onClick={()=>setQuery("dessert")}>Desserts</p>
                <p onClick={()=>setQuery("port")}>Port</p>
            </div>
            <div className="products">
                {data.map(e=>{
                    return (
                        <div key ={e.id}>
                            <img src={e.image} alt={e.wine} style={{width:"50px",height:"200px"}}/>
                            <p>{e.wine}</p>
                            <p>Location : {e.location}</p>
                            <p>Rating : {e.rating.average} <AiFillStar style={{color:"rgb(249,158,0)"}}/></p>
                            <p>{e.rating.reviews.split(' ')[0]} Reviews</p>
                            <Button onClick={()=>{handleCart(e)}}>Add to cart</Button>
                        </div>)
                })}
            </div>
        </div>
    )
}