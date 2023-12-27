import React,{useState,useEffect} from "react";
import axiosInstance from "../axios";
import './index.less'
import {Carousel} from 'antd'
import {Link} from 'react-router-dom'
import Navigation from '../component/navigation';

function Slider({list}){
    return(
        <div className="slider">
            <Carousel className="carousel" autoplay autoplaySpeed={3000} >
                {
                      list.map((item,index)=>
                      <Link className="adv" key={index} to={item.path}>
                        <div className="img" style={{backgroundImage:`url(${item.pic})`}}>
                        
                        </div>
                      </Link>
                     )
                }
            </Carousel>
        </div>
    )
}

function Item({item}){
    return(
        <Link className="item" to={`item/${item.id}`}>
            <img src={item.mainPic}/>
            <div className="title">{item.title}</div>
            <div className="price-box">
                <div className="price">￥
                    <span>{item.price}</span>
                </div>
                {
                    item.originPrice&& <div className="origin-price">￥{item.originPrice}</div>
                }
               
            </div>
        </Link>
    )
}
function Moudule({module}){
    return(
        <div className="module">
            <div className="title">
                <span>{module.title}</span>
            </div>
            <div className="items">
                {
                     module.items.map((item,index)=><Item key={index} item={item}/>)
                }
            </div>
        </div>
    )
}

function Index(){
    let [data ,setData]=useState(null);
    useEffect(()=>{
        axiosInstance.get('/index').then(data => setData(data));
    },[])
    console.log(data);
    if(!data){
        return null;
    }
    return (
        <div className="page index">  
            <Slider list={data.advs}/>
            {
                data.modules.map((module,index)=>
                 <Moudule module={module} key={index}/>
                )
            }
             <Navigation/>
        </div>
    )
}
export default Index;