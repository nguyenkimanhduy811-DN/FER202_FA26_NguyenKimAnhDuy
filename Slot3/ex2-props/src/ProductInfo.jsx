import Card from "./Card";

function ProductInfo({ title, price, description, tags, avatar }) {
  return (
    <Card>
      <img className="product-image" src={avatar} alt={title} />

      <div className="product-content">
        <h2>{title}</h2>

        <p className="price">${price}</p>

        <p>{description}</p>

        <div className="tags">
          {tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ProductInfo;