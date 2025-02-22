// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CategoryList from "./components/category/CategoryList";
import ProductList from './components/product/ProductList';
import ProductAdd from "./components/product/ProductAdd";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/" element={<ProductList/>}/><Route path="/" element={<ProductList/>}/>
                        <Route path="/product/add-product" element={<ProductAdd/>}/>
                        <Route path="/categories" element={<CategoryList/>}/>
                    </Routes>
                    <ToastContainer />
                </div>
            </div>
        </Router>
    );
}

export default App;
