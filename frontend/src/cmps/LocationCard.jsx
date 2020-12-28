import React from 'react'

export function LocationCard({ location, getLocation }) {

  return (
    <div className="location-card" onClick={() => getLocation(location.name)}>
      <h3>{location.name}</h3>
      <img className="loc-pic" src={`${location.imgUrl}`} alt="" />
    </div>
  )
}