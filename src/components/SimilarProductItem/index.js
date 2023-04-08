import './index.css'

const SimilarProductItem = props => {
  const {eachSimilar} = props

  const updateSimilarProducts = {
    imageUrl: eachSimilar.image_url,
    title: eachSimilar.title,
    brand: eachSimilar.brand,
    price: eachSimilar.price,
    rating: eachSimilar.rating,
  }

  return (
    <li className="similar-item-cont">
      <img
        src={updateSimilarProducts.imageUrl}
        alt="similar product"
        className="similar-img"
      />
      <h1 className="similar-item-title">{updateSimilarProducts.title} </h1>
      <p className="similar-item-brand">by {updateSimilarProducts.brand}</p>
      <div className="similar-item-price-rating-cont">
        <p className="similar-item-price">Rs {updateSimilarProducts.price}/-</p>
        <div className="star-btn-cont">
          <p className="rating">{updateSimilarProducts.rating} </p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
