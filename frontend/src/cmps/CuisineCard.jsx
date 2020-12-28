import React from 'react'

export function CuisineCard({ cuisine, getCuisine }) {

  return (
    <div className="cuisine-card" onClick={() => getCuisine(cuisine.name)}>
      <h3>{cuisine.name}</h3>
      <img className="cuis-pic" src={`${cuisine.imgUrl}`} alt="" />
    </div>
  )
}