import React, { useEffect, useState } from "react";
import './cat.less'
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Advertisement from "../component/advertisement";
import Product from "../component/product";
function Cat(){
    let {cat}=useParams();
    let [data,setData] =useState(null);
// 获取特定分类的商品数据，并将数据设置到 data 状态中
    useEffect(()=>{
        axiosInstance.get(`/cat/${cat}`).then(data=>setData(data));
    },[cat])

    if(!data){
        return null;
    }
    // 根据从获取到的数据 data 中的 bg 属性，来生成一个 style 对象，如果 bg 存在，
    // 则生成一个带有 background 属性的对象，否则为 null
    let style =data.bg?{background:data.bg}:null;
    console.log(style);
    return(
         <div className="page cat" style={style}>
            {/* // 轮播图片组件 */}
      <Advertisement list={data.advs}/>
            <div className="wrap">
                {
                    //  手机商品内容组件
                    data.items.map(item=><Product item={item} key={item.id}/>)
                }
            </div>
        </div>
    )
}

export default Cat;