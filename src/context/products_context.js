import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState)

const openSideBar = () => {
  dispatch({type: SIDEBAR_OPEN})
}

const closeSideBar = () => {
  dispatch({type: SIDEBAR_CLOSE})
}

const fetchProducts = (url) => {
  dispatch({type: GET_PRODUCTS_BEGIN})
  axios.get(url)
  .then(response => {
    const products = response.data
    dispatch({type: GET_PRODUCTS_SUCCESS, payload:products})
    //console.log(response.data)
  }).catch(error => {
    dispatch({type: GET_PRODUCTS_ERROR})
  })
}

useEffect(() => {
  fetchProducts(url)
  },[])

const fetchSingleProduct = (surl) => {
  dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
  axios.get(surl)
  .then(response => {
    const product_info = response.data
    dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload:product_info})
    //console.log(response.data)
  }).catch(error => {
    console.log(error)
    dispatch({type: GET_SINGLE_PRODUCT_ERROR})
  })
}

  return (
    <ProductsContext.Provider value={{...state, openSideBar, closeSideBar, fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
