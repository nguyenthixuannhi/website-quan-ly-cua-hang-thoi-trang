import "./ProductDetail.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import ProductDetailMain from "../../components/ProductDetailMain/ProductDetailMain";

function ProductDetail() {
  return (
    <>
      <Header />

      <main className="product-detail-page">

        <ProductDetailMain />

      </main>

      <Footer />
    </>
  );
}

export default ProductDetail;