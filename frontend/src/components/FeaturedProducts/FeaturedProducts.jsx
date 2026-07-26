import "./FeaturedProducts.css";

const products = [

{
    title:"Áo khoác len oversize",
    image:"/src/assets/products/p1.jpg",
    price:"1.290.000đ",
    oldPrice:"1.890.000đ",
    tag:"HOT"
},

{
    title:"Đầm lụa cổ chữ V",
    image:"/src/assets/products/p2.jpg",
    price:"890.000đ",
    oldPrice:"",
    tag:"NEW"
},

{
    title:"Blazer kẻ sọc cổ điển",
    image:"/src/assets/products/p3.jpg",
    price:"1.490.000đ",
    oldPrice:"1.990.000đ",
    tag:"HOT"
},

{
    title:"Váy xòe dáng midi",
    image:"/src/assets/products/p4.jpg",
    price:"720.000đ",
    oldPrice:"",
    tag:"NEW"
},

];

function FeaturedProducts(){

return(

<section className="featured">

<div className="container">

<div className="section-header">

<div>

<span>SẢN PHẨM</span>

<h2>Nổi bật tuần này</h2>

</div>

<div className="tabs">

<button className="active">Tất cả</button>

<button>Áo & Quần</button>

<button>Đầm & Váy</button>

<button>Phụ kiện</button>

</div>

</div>

<div className="product-grid">

{

products.map((item,index)=>(

<div
className="product-card"
key={index}
>

<div className="image">

<img
src={item.image}
alt=""
/>

<span className="tag">
{item.tag}
</span>

<div className="cart-hover">

<button>
Thêm vào giỏ hàng
</button>

</div>

</div>

<div className="info">

<h3>{item.title}</h3>

<div className="price">

<b>{item.price}</b>

<del>{item.oldPrice}</del>

</div>

</div>

</div>

))

}

</div>

<div className="center">

<button className="view-all">

Xem tất cả sản phẩm →

</button>

</div>

</div>

</section>

)

}

export default FeaturedProducts;