import React from "react";
import axios from "axios";
import { cartApi } from "../context/CartApi"
import { AiFillStar } from "react-icons/ai"
import { Button, Pagination,Input} from "antd"
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export const HomePage = () => {
    const [data, setData] = React.useState([]);
    const { handleCart } = React.useContext(cartApi);
    const [query, setQuery] = React.useState("reds");
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [pagedData, setPagedData] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [results, setResults] = React.useState([]);
    const navigate= useNavigate()
    React.useEffect(() => {
        setLoading(true);
        axios.get(`https://api.sampleapis.com/wines/${query}`).then(response => setData(response.data));
        setLoading(false);
    }, [query]);
    React.useEffect(() => {
        let offset = (page - 1) * 20;
        let pageData = data.slice(offset, offset + 20);
        setPagedData(pageData);
    },[page,data])
    const filterChange = (value) => {
        if (value === "Rl500") {
            let modifiedData = data.filter((e) => e.rating.reviews.split(' ')[0] < 500);
            setData(modifiedData);
        }
        if (value === "Rg500") {
            let modifiedData = data.filter((e) => e.rating.reviews.split(' ')[0] > 500);
            setData(modifiedData);
        }
        if (value === "Rg1000") {
            let modifiedData = data.filter((e) => e.rating.reviews.split(' ')[0] > 1000);
            setData(modifiedData);
        }
    }
    const pageChange = (value) => {
        setPage(value);
        navigate(`/?page=${page+1}`)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        let searchedresults = data.filter((e) => (e.wine).includes(search));
        setResults(searchedresults);
        if (search === "") {
            setResults([]);
        }
    }
    window.onclick = () => {
        setResults([]);
    }
    return (
        loading ? <div>Loading...</div> :
        <div>
            <div style={{display: 'flex',marginLeft:"30%",marginBottom:"50px"}}>
                <div className="search">
                        <Input onChange={(e)=>handleSearch(e)} placeholder="Search for your favourites wines"/>
                        <div className="output" style={{display:results.length>0?"block":"none"}}>{results?results.map(e => <p key={e.id} >{e.wine}</p>):null}</div>
                </div>
                <Select onChange={filterChange} style={{marginLeft:"20%",width:"fit-content"}} placeholder="Find by Filter....      .">
                    <Option value="Rl500">Reviews lesser than 500</Option>
                    <Option value="Rg500">Reviews greater than 500</Option>
                    <Option value="Rg1000">Reviews greater than 1000</Option>
                </Select>
            </div>    
            <div className="categories">
                <p onClick={()=>setQuery("reds")}>Reds</p>
                <p onClick={()=>setQuery("whites")}>Whites</p>
                <p onClick={()=>setQuery("sparkling")}>Sparkling</p>
                <p onClick={()=>setQuery("rose")}>Rose</p>
                <p onClick={()=>setQuery("dessert")}>Desserts</p>
                <p onClick={()=>setQuery("port")}>Port</p>
            </div>
            <div className="products">
                {pagedData.map(e=>{
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
                <div>
                    <Pagination onChange={pageChange} total={data.length} defaultPageSize={20} style={{ marginTop: "20px",position:"none"}}/>
                </div>
        </div>
    )
}