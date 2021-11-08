import React from 'react'

export const Filter = () => {
  return (
    <div className="container-fluid">
      <h5>Filter</h5>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          Category
        </div>
        <div className="col-md-12 col-sm-12">
          <div>
            <input type="checkbox" name="brush" id="brush" /> <label htmlFor="brush">Brush</label>
          </div>
          <div>
            <input type="checkbox" name="Anti Anging" id="Anti Anging" /> <label htmlFor="Anti Anging">Anti Anging</label>
          </div>
          <div>
            <input type="checkbox" name="Lipstick" id="Lipstick" /> <label htmlFor="Lipstick">Lipstick</label>
          </div>
          <div>
            <input type="checkbox" name="Night Cream" id="Night Cream" /> <label htmlFor="Night Cream">Night Cream</label>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 col-sm-12">
          Category
        </div>
        <div className="col-md-12 col-sm-12">
          <div>
            <input type="checkbox" name="50000 - 100000" id="50000 - 100000" /> <label htmlFor="50000 - 100000">50000 - 100000</label>
          </div>
          <div>
            <input type="checkbox" name="100000 - 200000" id="100000 - 200000" /> <label htmlFor="100000 - 200000">100000 - 200000</label>
          </div>
          <div>
            <input type="checkbox" name="200000 - 500000" id="200000 - 500000" /> <label htmlFor="200000 - 500000">200000 - 500000</label>
          </div>
        </div>
      </div>
    </div>
  )
}
