import React,{useState,useEffect} from "react";
import axiosInstance from "../axios";
// 引用NAvLink点击触发跳转item.path的路径
import { NavLink } from "react-router-dom";
import './navigation.less';

//头部导航栏组件Navigation
function Navigation(){
    const [list,setList] =useState([]);
    useEffect(()=>{
        // 在组件挂载后，通过 axios 实例向服务器发送 GET 请求获取导航数据，并在返回数据后通过 setList 更新 list 状态。
        axiosInstance.get('/navs').then(list=>setList(list));
    },[])
    console.log(list);
 return(
    <div className='navigation'>
        <div className='wrap'>
             {
                list.map(item=><NavLink  
                    to={item.path}
                    className={({isActive})=>isActive ? 'active nav':'nav'}
                >
                    {item.title}
                </NavLink>)
             }
        </div>
    </div>
 )
}
export default Navigation;