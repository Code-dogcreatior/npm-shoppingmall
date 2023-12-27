import React,{useState,useEffect} from "react";
import axiosInstance from "../axios";
import { NavLink ,useNavigate,useLocation} from "react-router-dom";
import './navigation.less';
import { HomeOutlined,UnorderedListOutlined,ShoppingCartOutlined,UserOutlined } from "@ant-design/icons";


const routers=[
    {
        path:'/index',content:<><HomeOutlined className="icon"/><span>首页</span></>
    },
    {
        path:'/cat',content:<><UnorderedListOutlined className="icon"/><span>分类</span></>
    },
    {
        path:'/cart',content:<><ShoppingCartOutlined className="icon"/><span>购物车</span></>
    },
    {
        path:'/me',content:<><UserOutlined className="icon"/><span>我的</span></>
    }
]

function Navigation(){
    var navigate = useNavigate();
    var location = useLocation();
    useEffect(()=>{
        if(location.pathname=='/'){
         navigate('/index')
        }
    },[])
 return(
    <div className='navigation'>
        <div className='wrap'>
           {
            routers.map((item,index)=>
             <NavLink  className="nav" key={index} to={item.path}>
                {item.content}
             </NavLink >
            )
           }
        </div>
    </div>
 )
}
export default Navigation;