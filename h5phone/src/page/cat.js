import React, { useEffect, useState } from "react";
import Navigation from "../component/navigation";
import axiosInstance from "../axios";
import './cat.less';
import { Link } from "react-router-dom";

function Cat() {
    const [list, setList] = useState([]);
    const [active, setActive] = useState(0);
    const [data,setData] = useState(null);
    useEffect(() => {
        axiosInstance.get('/navs').then(list => setList(list.slice(1)))
    },[])

    useEffect(() =>{
            let cat = list[active]?.path;
            if (cat) {
                axiosInstance.get(`/cat/${cat}`).then(data => setData(data));
            }  
    },[list,active])



    return (
        <div className="page-cat" >
            <div className="left-box">
                {
                    list.map((item, index) =>
                        <div key={item.path} className={index == active ? 'cat active' : 'cat'}
                            onClick={() => setActive(index)}
                        >
                            {item.title} 
                        </div>
                    )
                }
            </div>
                {
                data &&
                <div className="right-box" style={{backgroundColor : data.bg}}>
                        {
                            data.items.map(item =>
                                <Link className="item" key={item.id} to={`/${list[active]?.path}/item/${item.id}`}>
                                    <div className="pic" style={{backgroundImage : `url(${item.mainPic})`}}></div>
                                    <div className="title">{item.title}</div>
                                    <div className="price">￥<span>{item.price}</span></div>
                                    <div className="origin-price">￥<span>{item.originPrice}</span></div>
                                </Link>


                            )
                        }
                </div>
                }   

            <Navigation />
        </div>
    )
}

export default Cat;