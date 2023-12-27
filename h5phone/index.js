import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.less'
import Index from './page';
import { HashRouter ,Routes,Route} from 'react-router-dom';
import Cat from './page/cat';
import Cart from './page/cart';
import Me from './page/me';
import Item from './page/item';
/**
 * 接口
 * 1. axiosInstance.get('/navs') 获取导航数据
 * 2. axiosInstance.get('/index') 获取首页数据
 */

function App() { 
    return (
        <div>
            <HashRouter>
            <Routes>
            <Route path='/' element={<Index/>}></Route>
            <Route path='/index' element={<Index/>}>首页</Route>
            <Route path='/cat' element={<Cat/>}>分类</Route>
            <Route path='/cart' element={<Cart/>}>购物车</Route>
            <Route path='/me' element={<Me/>}>个人中心</Route>
            <Route path='/:page/item/:id' element={<Item/>}></Route>
            </Routes>
            </HashRouter>
        </div>
    )
}


var root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);