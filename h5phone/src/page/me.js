import React, { useEffect, useState } from "react";
import './me.less'
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Navigation from "../component/navigation";
import {RightOutlined,WalletOutlined,
VerticalAlignTopOutlined,HistoryOutlined,
ShoppingCartOutlined,MessageFilled,RedEnvelopeFilled ,
MoneyCollectFilled,MedicineBoxFilled,PlusSquareFilled,
MailFilled,PayCircleFilled,GiftOutlined,BankTwoTone,
UserAddOutlined,CarTwoTone,EnvironmentOutlined,
CustomerServiceFilled,SettingOutlined} from '@ant-design/icons';
function Me(){
    return(
         <div className="page-me" >
            <div className="top">
                <div className="top-a">
                    <div className="box1">
                        <div className="order">我的订单</div>
                        <a>查看全部 <RightOutlined /></a>
                    </div>
                    <div className="box2">
                        <div><WalletOutlined className="icon"/><span className="a">待付款</span></div>
                        <div><VerticalAlignTopOutlined className="icon"/><span className="a">待分享</span></div>
                        <div><HistoryOutlined className="icon"/><span className="a">待发货</span></div>
                        <div><ShoppingCartOutlined className="icon"/><span className="a">待收货</span></div>
                        <div><MessageFilled className="icon"/><span className="a">评价</span></div>
                    </div>
                    <div className="box3">
                    <div className="order">多多钱包</div>
                        <a><RedEnvelopeFilled  twoToneColor="rgb(224,46,36)" className="red"/><span>五元支付立减优惠待领取</span></a>
                    </div>
                    <div className="box4">
                        <div><MoneyCollectFilled className="icon"/><span className="a">优惠卷</span></div>
                        <div><MedicineBoxFilled className="icon"/><span className="a">商品收藏</span></div>
                        <div><PlusSquareFilled className="icon"/><span className="a">店铺关注</span></div>
                        <div><MailFilled className="icon"/><span className="a">历史游览</span></div>
                        <div><PayCircleFilled className="icon"/><span className="a">退款售后</span></div>
                    </div>
                    <div className="box5">
                    <div><GiftOutlined className="icon"/><span className="a">现金大转盘</span></div>
                    <div><BankTwoTone className="icon" twoToneColor="rgb(240,161,94)"/><span className="a">多多牧场</span></div>
                    <div><UserAddOutlined className="icon"/><span className="a">新客立减</span></div>
                    <div><CarTwoTone  className="icon" twoToneColor="rgb(240,161,94)"/><span className="a">火车票</span></div>
                    <div><EnvironmentOutlined className="icon"/><span className="a">收货地址</span></div>
                    <div><CustomerServiceFilled  className="icon"/><span className="a">官方客服</span></div>
                    <div><SettingOutlined  className="icon"/><span className="a">设置</span></div>
                    </div>
                    <div className="box6">
                        <div className="frame1 text">
                            <p></p>
                        </div>
                        <div className="frame2 text">
                            
                        </div>
                    </div>
                    <p>小文哥太酷啦！！！</p>
                </div>
            </div>
            <Navigation />
        </div>
    )
}

export default Me;