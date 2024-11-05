import axios from "axios";
import {PRODUCTS_API} from "../constant/api";

export const fetchProducts = async (name = "", categoryId = "") => {
    try {
        const response = await axios.get(PRODUCTS_API, {
            params: {
                name: name || undefined,
                categoryId: categoryId || undefined,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Lỗi khi gọi API sản phẩm: " + error);
    }
};

export const fetchProductId = async (id) => {
    try {
        const response = await axios.get(`${PRODUCTS_API}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Lỗi khi lấy sản phẩm theo ID: " + error);
    }
};

export const addProduct = async (product) => {
    try {
        await axios.post(PRODUCTS_API, product);
        return true;
    } catch (error) {
        throw new Error("Lỗi khi thêm sản phẩm: " + error);
        // eslint-disable-next-line no-unreachable
        return false;
    }
};
