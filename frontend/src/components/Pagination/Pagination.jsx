import "./Pagination.css";

function Pagination() {
  return (
    <section className="pagination-section">

      <button className="page-btn active">
        1
      </button>

      <button className="page-btn">
        2
      </button>

      <button className="page-btn">
        3
      </button>

      <button className="page-btn">
        4
      </button>

      <button className="page-btn next">
        Tiếp →
      </button>

    </section>
  );
}

export default Pagination;