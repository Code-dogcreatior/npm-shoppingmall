import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less'
import axiosInstance from './axios';
import Navigation from './component/navigation';
import Index from './page/index';
import { HashRouter ,Routes,Route} from 'react-router-dom';
import Cat from './page/cat';
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
            <Navigation/>
            <Routes>
            {/* 用于开始默认网站的首页内容； */}
            <Route path="/" element={<Index/>}></Route>
            {/* 用于完全属于 '/index' 的路径。 */}
            <Route path='/index' element={<Index/>}></Route>
            {/* 用于点击显示某个商品分类页 */}
            <Route path='/:cat' element={<Cat/>}></Route>
            {/* 渲染 Item 组件，用于点击进入某个商品的详细信息页。 */}
            <Route path='/item/:id' element={<Item/>}></Route>
            {/* 渲染 Item 组件，用于点击轮播图显示某个商品的详细信息页。 */}
            <Route path='/:cat/item/:id' element={<Item/>}></Route>
            </Routes>
            </HashRouter>
        </div>
    )
}


var root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);