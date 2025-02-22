import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {addProduct} from "../../service/productService";
import {Link, useNavigate} from "react-router-dom";
import {fetchCategories} from "../../service/categoryService";
import {toast} from "react-toastify";

function ProductAdd() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    });

    const loadCategories = async () => {
        try {
            let data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            throw new Error("Lỗi khi tải danh mục: " + error);
        }
    };

    const onSubmit = async (values) => {
        try {
            await addProduct(values);
            toast.success("Thêm sản phẩm thành công");
            reset();
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            toast.error("Lỗi khi thêm sản phẩm: " + error.message);
        }
    };
    return (
        <div className={"max-w-md mx-auto bg-white p-6 shadow-md rounded-lg"}>
            <div className="mt-4">
                <Link
                    to="/"
                    className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Trở về
                </Link>
            </div>
            <h1 className={"text-2xl font-bold mb-4 text-center"}>
                Thêm sản phẩm mới
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Mã sản phẩm:
                    </label>
                    <input
                        type="text"
                        {...register("code", {
                            required: "Mã sản phẩm không được để trống",
                            pattern: {
                                value: /^PROD-\d{4}$/,
                                message: "Mã sản phẩm phải có dạng PROD-XXXX với X là các số",
                            },
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.code && (
                        <p className={"text-red-500 text-sm"}>
                            {errors.code.message}
                        </p>
                    )}
                </div>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Tên sản phẩm:
                    </label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Tên sản phẩm không được để trống",
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.name && (
                        <p className={"text-red-500 text-sm"}>{errors.name.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Thể loại:
                    </label>
                    <select
                        {...register("categoryId", {
                            required: "Vui lòng chọn thể loại",
                        })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                        <option value="">Chọn thể loại</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && (
                        <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
                    )}
                </div>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Giá:
                    </label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Giá không được để trống",
                            min: {
                                value: 1,
                                message: "Giá phải lớn hơn 0",
                            },
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.price && (
                        <p className={"text-red-500 text-sm"}>{errors.price.message}</p>
                    )}
                </div>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Số lượng:
                    </label>
                    <input
                        type="number"
                        {...register("quantity", {
                            required: "Số lượng không được để trống",
                            min: {
                                value: 1,
                                message: "Số lượng phải lớn hơn 0",
                            },
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.quantity && (
                        <p className={"text-red-500 text-sm"}>{errors.quantity.message}</p>
                    )}
                </div>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Ngày nhập:
                    </label>
                    <input
                        type="date"
                        {...register("date", {
                            required: "Ngày nhập không được để trống",
                            validate: (value) =>
                                new Date(value) >= new Date() || "Ngày nhập không được nhỏ hơn ngày hiện tại",
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.date && (
                        <p className={"text-red-500 text-sm"}>
                            {errors.date.message}
                        </p>
                    )}
                </div>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700"}>
                        Mô tả:
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Mô tả không được để trống",
                        })}
                        className={"mt-1 p-2 border border-gray-300 rounded-md w-full"}
                    />
                    {errors.description && (
                        <p className={"text-red-500 text-sm"}>
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
}

export default ProductAdd;
