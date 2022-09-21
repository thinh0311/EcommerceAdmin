import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCategory from "../views/pages/AddCategory";
import AddProduct from "../views/pages/AddProduct";
import Analytics from "../views/pages/Analytics";
import Categories from "../views/pages/Categories";
import Customers from "../views/pages/Customers";
import DashBoard from "../views/pages/DashBoard";
import EditCategory from "../views/pages/EditCategory";
import EditProduct from "../views/pages/EditProduct";
import OrderDetail from "../views/pages/OrderDetail";
import Orders from "../views/pages/Orders";
import PDF from "../views/pages/PDF";
import Products from "../views/pages/Products";

const Switch = () => {
  return (
    <Routes>
      <Route path="" element={<DashBoard />} />
      <Route path="customers" element={<Customers />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="categories" element={<Categories />} />
      <Route path="categories/add-category" element={<AddCategory />} />
      <Route
        path="categories/edit-category/:categoryId"
        element={<EditCategory />}
      />
      <Route path="products" element={<Products />} />
      <Route path="products/add-product" element={<AddProduct />} />
      <Route
        path="products/edit-product/:productId"
        element={<EditProduct />}
      />
      <Route path="orders" element={<Orders />} />
      <Route path="orders/order-detail/:orderId" element={<OrderDetail />} />
      <Route path="export/:start/:end" element={<PDF />} />
    </Routes>
  );
};

export default Switch;
