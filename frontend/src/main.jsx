import React from "react";

import ReactDOM from "react-dom/client";

import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

ReactDOM.createRoot(

document.getElementById("root")

).render(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route path="/product" element={<Product />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

</Routes>

</BrowserRouter>

);