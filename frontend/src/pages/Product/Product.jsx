import { createContext, useState } from "react";

import "./Product.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import ProductHero from "../../components/ProductHero/ProductHero";

export const ProductPaginationContext = createContext(null);

function Product() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <ProductPaginationContext.Provider
      value={{
        totalProducts,
        setTotalProducts,
        totalPages,
        setTotalPages,
      }}
    >
      <Header />

      <main className="product-page">

        <ProductHero />

        <section className="product-content">
          <SidebarFilter />
          <ProductGrid />
        </section>

        <Pagination />

        <RecentlyViewed />

      </main>

      <Footer />
    </ProductPaginationContext.Provider>
  );
}

export default Product;