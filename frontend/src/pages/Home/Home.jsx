import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: "700px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f6f7fb"
        }}
      >
        <h1>TRANG CHỦ WEBSITE THỜI TRANG</h1>
      </main>

      <Footer />
    </>
  );
}

export default Home;