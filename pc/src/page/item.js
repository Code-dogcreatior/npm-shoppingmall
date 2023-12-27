import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import './item.less'

// 用于展示item的商品图片的多张图片
function ImageDisplay({pics}){
    // 用于追踪当前显示的图片索引非常有用。
    var [active,setActive] =useState(0);
    console.log(pics);
    return (
        //绑定为当前 active 索引对应的图片链接 显示当前选中的图片
        <div className="image-display">
            <div className="pic">
                <img src={pics[active]}/>
            </div> 
        {/* 绑定为当前索引对应的图片链接，显示所有的缩略图。 */}
            <div className="thumb">
                {
                    pics.map((pic,index)=> 
                    <div 
                    key={index} 
                    className={ active==index?"img active":'img'}
                    // 添加了 onMouseOver 事件处理函数。当鼠标悬停在一个缩略图上时，该事件处理函数会被触发
                    onMouseOver={()=>{
                        setActive(index)
                    }}>
                    <img src={pic} />
                    </div>)
                }
            </div> 
        </div>
    )
}
// 创建预选版本、颜色选择规格组件
function Sku({sku}){
    let [active,setActive]=useState(0);
    return (
        <div className="sku-box">
            {/* 获取并显示了标题信息。 */}
            <div className="title">{sku.title}</div>
            <div className="sku-list">
            {
                // sku.options数组进行遍历
                sku.options.map((option,index)=>
                // sku active当前选中的状态，sku未选中的状态
                <div className={active==index?'sku active':'sku'} key={index}
                 onClick={()=>setActive(index)}
                 >
                {option.text}
                </div>
                )
            }
            </div>
        </div>
    )
}
// 我们定义了展示商品基本信息的 Info 组件。它接收商品的标题、副标题、价格信息以及不同规格和版本的选择作为参数
function Info({title,subTitle,price,originPrice,skus}){
    return (
        <div className="info">
            {/* 显示商品的标题信息。 */}
            <div className="title">{title}</div>
            {/* 显示商品的副标题信息。 */}
            <div className="sub-title">{subTitle}</div>
            <div className="pric-box">
                {/* 用于显示商品的特惠信息。 */}
                <div className="tip">限时特惠</div>
                <div>
                    {/* 显示商品的价格信息 */}
                    <div className="price"><span>￥</span>{price}</div>
                    {
                        // 如果商品没有打折信息，这个元素就不会被渲染。
                        originPrice&&<div className="origin-price"><span>￥</span>{originPrice}</div>
                    }
                    
                </div>
            </div>
            {
                //对 skus 数组进行遍历
                skus.map((sku,index)=><Sku key={index} sku={sku}/>)
            }
            <div className="op">
                {/* 加入购物车功能*/}
                <div className="add-cart">加入购物车</div>
                {/* 立即购买功能。 */}
                <div className="buy">立即购买</div>
            </div>
        </div>
    )
}
// 它接收商品详情图片列表作为参数。
function Detail({list}){
    return(
    <div className="detail">
        {/*  */}
        {
            // 对list数组内的所有图片都渲染出来
            list.map((src,index)=><img src={src} key={index}/>)
        }
    </div>
    )
}
function Item(){
    // 使用了 useParams 钩子，获取了 URL 中的 id 参数，并将其存储在变量 id 中。
    let {id} =useParams();
    console.log(id);
    // data 用于存储从服务器端获取的数据
    let [data,setData]=useState(null);
    console.log(data);
    useEffect(()=>{
        // 使用了 useEffect 钩子来订阅 id 参数的变化，并响应地更新数据
        axiosInstance.get(`/item/${id}`).then(data=>setData(data))
    },[id])
    // data 为 null，不会渲染任何内容。
    if(!data){
        return null;
    }
    return(
        <div className='page item'>
            <div className="main">
                <ImageDisplay pics={data.pics}/>
                <Info {...data}/>
                
            </div>
            <Detail list={data.detail}/>
        </div>
    )
}

export default Item;