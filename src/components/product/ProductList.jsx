// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../service/productService.jsx";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../service/categoryService.jsx";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

function ProductList() {
    let [products, setProducts] = useState([]);
    let [categories, setCategories] = useState([]);
    let [searchName, setSearchName] = useState("");
    let [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    let loadProducts = async () => {
        try {
            let data = await fetchProducts();
            setProducts(data);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Không thể tải danh sách sản phẩm");
        }
    };

    let loadCategories = async () => {
        try {
            let data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            toast.error("Không thể tải danh sách danh mục");
        }
    };

    let handleSearch = async () => {
        let filteredProduct = await fetchProducts(searchName, selectedCategory);
        setProducts(filteredProduct);
    };

    return (
        <div className={"container mx-auto p-4"}>
            <Link
                to="/product/add-product"
                className="inline-block mb-4 px-2 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Thêm sản phẩm mới
            </Link>
            <Link
                to="/categories"
                className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Danh sách danh mục
            </Link>
            <h1 className={"text-2xl font-bold mb-6 text-center"}>
                Danh sách sản phẩm
            </h1>
            <div className={"flex mb-4"}>
                <input
                    type={"text"}
                    placeholder={"Nhập tên sản phẩm"}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className={"p-2 border border-gray-300 rounded-md mr-2"}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md mr-2"
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tìm kiếm
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">STT</th>
                        <th className="py-3 px-6 text-left">Mã sản phẩm</th>
                        <th className="py-3 px-6 text-left">Tên sản phẩm</th>
                        <th className="py-3 px-6 text-left">Mô tả sản phẩm</th>
                        <th className="py-3 px-6 text-left">Thể loại</th>
                        <th className="py-3 px-6 text-left">Giá</th>
                        <th className="py-3 px-6 text-left">Số lượng</th>
                        <th className="py-3 px-6 text-left">Ngày nhập</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-center">{index + 1}</td>
                            <td className="py-3 px-6 text-left">{product.code}</td>
                            <td className="py-3 px-6 text-left">{product.name}</td>
                            <td className="py-3 px-6 text-left">{product.description}</td>
                            <td className="py-3 px-6 text-left">
                                {categories.find(
                                    (category) => category.id === product.categoryId
                                )?.name || "Không xác định"}
                            </td>

                            <td className="py-3 px-6 text-left">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(product.price)}
                            </td>
                            <td className="py-3 px-6 text-left">{product.quantity}</td>
                            <td className="py-3 px-6 text-left">
                                {new Date(product.date).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;
