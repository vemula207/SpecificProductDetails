// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    stateStatus: statusConstants.initial,
    detailedViewList: [],
    count: 1,
  }

  componentDidMount() {
    this.getDetailedViewOfProducts()
  }

  getDetailedViewOfProducts = async () => {
    this.setState({stateStatus: statusConstants.inProgress})

    const {match} = this.props

    const {params} = match

    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(productDetailsApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.similar_products)

      const updatedDetailedData = {
        availability: fetchedData.availability,
        brand: fetchedData.brand,
        description: fetchedData.description,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        price: fetchedData.price,
        rating: fetchedData.rating,
        title: fetchedData.title,
        totalReviews: fetchedData.total_reviews,
        similarProducts: fetchedData.similar_products,
      }
      console.log(updatedDetailedData)
      console.log(fetchedData.similar_products)
      this.setState({
        detailedViewList: updatedDetailedData,
        stateStatus: statusConstants.success,
      })
    } else {
      this.setState({stateStatus: statusConstants.failure})
    }
  }

  renderedProductsFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="product-not-found-img"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <Link to="/products">
        <button className="continue-butn" type="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderedProductsInProgress = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onIncrementQuantity = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrementQuantity = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderedProductsSuccess = () => {
    const {detailedViewList, count} = this.state
    const {
      imageUrl,
      brand,
      description,
      rating,
      price,
      availability,
      similarProducts,
      title,
      totalReviews,
    } = detailedViewList

    return (
      <div className="bottom-detailed-cont">
        <div className="detailed-cont">
          <img src={imageUrl} alt="product" className="detailed-view-img" />

          <div className="product-info-cont">
            <h1 className="title">{title} </h1>
            <p className="price">Rs {price}/-</p>
            <div className="rating-review-cont">
              <div className="star-btn-cont">
                <p className="rating">{rating} </p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p className="reviews">{totalReviews} Reviews</p>
            </div>

            <p className="description">{description} </p>

            <p className="availability">
              <span className="span-availability"> Availability :</span>
              {availability}
            </p>
            <p className="brand">
              <span className="span-brand"> Brand:</span> {brand}
            </p>
            <hr className="line-hr" />
            <div className="plus-minus-cont">
              <button
                data-testid="minus"
                type="button"
                className="inc-dec-btn"
                onClick={this.onDecrementQuantity}
              >
                <BsDashSquare />
              </button>
              <p className="count">{count}</p>
              <button
                data-testid="plus"
                type="button"
                className="inc-dec-btn"
                onClick={this.onIncrementQuantity}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-to-cart-btn" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <ul className="similar-list-container">
          {similarProducts.map(eachSimilar => (
            <SimilarProductItem
              eachSimilar={eachSimilar}
              key={eachSimilar.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  getAllViewsOfProducts = () => {
    const {stateStatus} = this.state

    switch (stateStatus) {
      case statusConstants.success:
        return this.renderedProductsSuccess()
      case statusConstants.failure:
        return this.renderedProductsFailure()
      case statusConstants.inProgress:
        return this.renderedProductsInProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-sections">{this.getAllViewsOfProducts()}</div>
      </>
    )
  }
}

export default ProductItemDetails
