import React,{useState,useEffect} from "react";
import axiosInstance from "../axios";
import './index.less'
import { Carousel } from "antd";
import {Link} from 'react-router-dom'
import Advertisement from "../component/advertisement";
import Product from "../component/product";
function Index(){
// // data 用于存储从服务器端获取的数据
    let [data ,setData]=useState(null);
    // // showAll 用于标识是否显示所有产品
    const [showAll, setShowAll] = useState(false);
    // // 使用 useEffect 来进行副作用操作，这里是发送请求获取数据
    useEffect(()=>{
        axiosInstance.get('/index').then(data=>setData(data));
    },[])
// // 如果数据还未获取到，则返回 null
    if(!data){
        return null;
    }
    console.log(data);
    // 控制显示所有产品的函数
    const toggleShowAll = () => {
        setShowAll(!showAll);
      };
    return(
        <div className="index">
             {/* 渲染Advertisement组件，传入advs的数据 */}
            <Advertisement list={data.advs}></Advertisement>
            {/* <Carousel className="carousel" autoplay autoplaySpeed={3000} >
                {
                      data.advs.map((adv,index)=>
                        <Link key={index} to={adv.path}>
                        <img src={adv.pic}/>
                        </Link>
                     )
                }
            </Carousel> */}
            <div className="wrap">
                {
                     // 遍历数据modules，渲染每个模块的商品列表
                    data.modules.map((module,index)=>
                        <div className="module" key={index}>
                             {/* 如果模块中的产品数量超过 4 个，则显示“更多”按钮 */}
                            {module.items.length > 4 &&(
                                    <button onClick={toggleShowAll} className="more-button">
                                       {showAll ? "收起" : "更多"}
                                   </button>
                                  )}
                                   {/* 显示模块标题 */}
                            <div className="title">{module.title}</div>
                            <div className={`items ${showAll ? "show-all" : ""}`}>
                                {
                                     // 根据 showAll 的状态，显示所有产品或部分产品
                                showAll ? 
                                // 显示所有产品
                                    module.items.map((item,key)=>
                                        // <Link className="item" key={key} to={`/item/${item.id}`}>
                                        //     <img src={item.mainPic}/>
                                        //     <div className="title">{item.title}</div>
                                        //     <div className="sub-title">{item.subTitle}</div>
                                        //     <div className="price-box">
                                        //     <div className="price">￥{item.price}</div>
                                        //     {
                                        //         item.originPrice&& <div className="origin-price">￥{item.originPrice}</div>
                                        //     }
                                        //     </div>
                                        // </Link>
                                        <Product key={key} item={item}></Product>
                                    ):  
                                     // 显示部分产品
                                    module.items.slice(0, 4).map((item,key)=>
                                        // <Link className="item" key={key} to={`/item/${item.id}`}>
                                        //     <img src={item.mainPic}/>
                                        //     <div className="title">{item.title}</div>
                                        //     <div className="sub-title">{item.subTitle}</div>
                                        //     <div className="price-box">
                                        //     <div className="price">￥{item.price}</div>
                                        //     {
                                        //         item.originPrice&& <div className="origin-price">￥{item.originPrice}</div>
                                        //     }
                                        //     </div>
                                        // </Link>
                                        <Product key={key} item={item}></Product>
                                    )
                                }
                               
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Index;