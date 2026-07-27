import "./Product.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";

import ProductHero from "../../components/ProductHero/ProductHero";

function Product() {
  return (
    <>
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
    </>
  );
}

export default Product;