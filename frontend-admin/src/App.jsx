import React from 'react'
import { RefineLayout, Title } from '@pankod/refine-antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/products'
import Users from './pages/users'

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: 16 }}>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/">Products</Link> | <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
