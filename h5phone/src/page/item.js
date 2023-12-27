import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import './item.less'
import { Carousel,Modal } from "antd";

function Slider({list}){
    
    return (
        <div className="slider">
            <Carousel className="carousel">
                {
                      list.map((item , index) =>
                        <div key={index}>
                            <div className="img" style={{backgroundImage:`url(${item})`}}></div>
                        </div>
                     )
                }
            </Carousel>
        </div>
    )
}
function Info({title,subTitle,price,originPrice,skus}){
    return (
        <div className="info">
            <div className="title">{title}</div>
            <div className="sub-title">{subTitle}</div>
            <div className="price-box">
                <div>
                    <div className="price"><span>￥</span>{price}</div>
                    {
                        originPrice&&<div className="origin-price"><span>￥</span>{originPrice}</div>
                    }
                    
                </div>
            </div>
        </div>
    )
}
function Detail({list}){
    return(
    <div className="detail">
        {
            list.map((src,index)=><img src={src} key={index}/>)
        }
    </div>
    )
}


function Operation({skus}){
    let [type ,setType]=useState(null);
    return(
        <div className="operation">
            <div className="wrap">
                <div className="add-cart" onClick={()=>setType('add')}>加入购物车</div>
                <div className="buy" onClick={()=>setType('buy')}>立即购买</div>
            </div>
                <SkuSelect  skus={skus} type={type} setType={setType}/>
           
        </div>
    )
}
function SkuSelect({skus,type,setType}){
    let {id} =useParams();
    let [selected, setSelected]=useState(function(){
        var item ={};
        skus.map(sku=>item[sku.title]=sku.options[0].text);
        return item;
    })
    function setSku(key,value){
        selected[key] = value;
        setSelected({...selected});
    }
    function addCart(id,selected) {
        var sku = Object.values(selected).join(' ');
        var cartList = JSON.parse(window.localStorage.cartList || '[]');
        var item = cartList.find(item => item.id == id  && item.sku == sku);
        if(item){
            item.count++;
        }else{
            cartList.push({id,sku,count :1});
        }
        window.localStorage.cartList = JSON.stringify(cartList);
    }

    return(
        <div className={type ? 'sku-select-wrap show':'sku-select-wrap'}>
        <div className="mask" onClick={()=>setType=(null)} ></div>
        <div className="sku-select" >
            {
                skus.map(sku => <Sku key={sku.title} sku={sku} setSku={setSku}/>)
            }
            {
                type=='add'&&
                <div className="add-cart" onClick={()=>{
                    addCart(id,selected);
                Modal.success({title:'加入购物车成功'})
                setType(null);
             }}>加入购物车</div>
            }  
            {
                type=='buy'&&
                <div className="buy" onClick={()=>{
                    Modal.success({title:'购买成功'});
                    setType(null);
                 }}>立即购买</div>
            }
        </div>
        </div>
    )
}
function Sku({sku,setSku}){
    var [active,setActive]=useState(0);
    return (
        <div className="sku">
            <div className="title">{sku.title}</div>
            <div className="box">
            {
                sku.options.map((option,index)=>
                <div className={active==index?'option active':'option'} 
                onClick={()=>{
                    setActive(index);
                    setSku(sku.title,option.text)
                }}
                key={index}
                 >
                {option.text}
                </div>
                )
            }
            </div>
       </div>
    )
}
function Item(){
    let {page,id} =useParams();
    let [data,setData]=useState(null);
    console.log(data); 
    useEffect(()=>{
        setData(null);
        axiosInstance.get(`/item/${id}`).then(data=>setData(data));
    },[id])
    console.log(data);
    if(!data){
        return null;
    }
    return(
        <div className='page item'>
                <Slider list={data.pics}/>
                <Info {...data}/>
                <Detail list={data.detail}/>
                <Operation skus={data.skus}/>
        </div>
    )
}

export default Item;