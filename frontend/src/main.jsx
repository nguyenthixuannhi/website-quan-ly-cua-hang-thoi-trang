import React from "react";

import ReactDOM from "react-dom/client";

import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home/Home";

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