function ProductCard({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <img src={`http://localhost:3300/product/image/${product._id}`} alt={product.name} />
    </div>
  )
}

export default ProductCard