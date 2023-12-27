import React from "react";
//引用Carousel 用于创建轮播效果。
import { Carousel } from "antd";
import './advertisement.less';
// 引用Link点击触发跳转item.path的路径
import { Link } from "react-router-dom";

// 轮播图片组件Advertisemen
function Advertisement({list}){
    //  进行了存在性检查，如果不存在或长度为 0，则返回 null。
   if(!list?.length){
    return null;
   }
    return (
        <Carousel className="advertisement" dots={{className:'dot',doWidth:5}} autoplay>
        {
              list.map((item,index)=>
                <Link key={index} to={item.path}>
                <div className="img" style={{backgroundImage:`url(${item.pic})`}}>
                </div>
                </Link>
             )
        
        }
    </Carousel>
    )
}

export default Advertisement;