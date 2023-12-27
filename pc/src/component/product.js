import React from "react";
import './product.less'
// 引用Link点击触发跳转指向路径`/item/${item.id}
import { Link } from "react-router-dom";

// 商品内容组件
function Product({item}){

    return (
            <Link className="product"  to={`/item/${item.id}`}>
                {/* 显示商品的主图，通过样式设置背景图像 */}
                <div className='img' style={{backgroundImage :`url(${item.mainPic})`}}></div>
                 {/* 显示商品的标题 */}
                <div className="title">{item.title}</div>
                 {/* 显示商品的副标题 */}
                <div className="sub-title">{item.subTitle}</div>
                {/* 显示商品的价格信息 */}
                <div className="price-box">
                {/* 显示商品的当前价格 */}
                <div className="price">￥{item.price}</div>

                {
                    /* 如果商品有原价，显示原价 */
                    item.originPrice&& <div className="origin-price">￥{item.originPrice}</div>
                }
                </div>
            </Link>
        )
}
export default Product;