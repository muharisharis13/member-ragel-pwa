import React from 'react'
import { Product } from './product/Product'
import { Filter } from './filter/Filter'

export const IndexContent = ({ dataProduct }) => {
  return (
    <div className="container mt-5 pb-5">
      <div className="row">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <Filter />
        </div>
        <div className="col-lg-9 col-md-12 col-sm-12">
          <Product data={dataProduct} />
        </div>
      </div>
    </div>
  )
}
