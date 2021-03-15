import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products:products, grid_view} = useFilterContext();
  
  if(products < 1) {
    return <h3>Sorry, there are no matched products</h3>
  }
  if(grid_view === false) {
    return <ListView products={products}>List view</ListView>
  }
  return <GridView products={products}></GridView>
}

export default ProductList
