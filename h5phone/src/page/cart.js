import React, { useEffect, useState } from "react";
import Navigation from "../component/navigation";
import axiosInstance from "../axios";
import './cart.less'
import { Checkbox, Input, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

function Cart() {
    var [list, setList] = useState([]);
    useEffect(() => {
        var cartList = JSON.parse(window.localStorage.cartList || '[]');
        axiosInstance.post('/items', { ids: cartList.map(item => item.id) }).then(list => {

            cartList.map(one => {
                var item = list.find(item => item.id == one.id);
                one.item = item;
            })

            
            setList(cartList);
        });

    }, []);

    useEffect(() => {
        window.localStorage.cartList = JSON.stringify(list);
    }, [list])

    return (
        <div className="page cart" >
            {
                list.map((cart, index) =>
                    <div className="item" key={index}>
                        <Checkbox className="select" Checkbox={cart.checked} onChange={() => {
                            cart.checked = !cart.checked;
                            setList([...list]);
                        }} />
                        <div className="pic" style={{ backgroundImage: `url(${cart.item.mainPic})` }}></div>
                        <div className="title">{cart.item.title}</div>
                        <div className="sku">{cart.sku}</div>
                        <div className="price"><span>￥{cart.item.price}</span></div>
                        <Input
                            addonBefore={<MinusOutlined onClick={() => {
                                if (cart.count <= 1) {
                                    Modal.confirm({
                                        title: '商品数量最小为1，您是否要删除该商品',
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk: () => {
                                            setList(list.filter(item => item !== cart))
                                        }
                                    });
                                } else {
                                    cart.count--;
                                    setList([...list]);
                                }


                            }} />}
                            addonAfter={<PlusOutlined onClick={() => {
                                cart.count++;
                                setList([...list]);
                            }} />}
                            className="count"
                            value={cart.count}
                            onChange={e => {
                                var value = e.target.value;
                                if (/^\d*/.test(value)) {
                                    cart.count = value;
                                    setList([...list]);
                                }
                            }}
                        />
                    </div>
                )
            }
            <Total list={list} setList={setList} />
            <Navigation />
        </div>
    )
}
function Total({list,setList}) {
    var totalPrice =0;
    list.map( cart => {
        var count = parseInt(cart.count) || 0;
        if(cart.checked && cart.count >0){
            totalPrice += parseFloat(cart.item.price)* count;
        }
    })
    return (
        <div className="total">
            <div className="box">
                <Checkbox checked={list.every(item => item.checked)} onChange={e => {
                    var checked = e.target.checked;
                    list.map(cart => cart.checked = checked);
                    setList([...list])
                }}> 全选 </Checkbox>
                <div className="right">合计:
                    <span className="total-price">
                        ￥<span className="price">{totalPrice.toFixed(2)}</span>
                    </span>
                    <button onClick={() => {
                        var text =[];
                        list.map(cart => {
                            if(cart.checked){
                                text.push(`
                                ${cart.id} ${cart.count}件 : 价格 ${cart.item.price}
                                `)
                            }
                        })
                        Modal.success({
                            title:`
                                购买商品：
                                ${text.join(',')}
                            `,
                            onOk : () => {
                                setList(list.filter(item => !item.checked));
                            }
                        })
                    }}>结算</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;