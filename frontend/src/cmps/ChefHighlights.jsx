import React from 'react'

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatDate(time) {
  let options = {
    year: 'numeric',
    month: 'short'
  };
  return new Intl.DateTimeFormat('en', options).format(time);
}

const starsNum = getRandomNum(1, 3)

const date = formatDate(getRandomNum(1500860645648, 1600870745647))

const magazines = ['Food', 'Chef', 'Knife', 'Wine', 'Fork', 'Spoon', 'Pie']

export function ChefHighlights() {
  return (
    <div className="highlights">
      <h3><i className="fas fa-certificate"></i>&nbsp;&nbsp;&nbsp;&nbsp; {starsNum}  {starsNum === 1 ? 'Michelin Star' : 'Michelin Stars'}</h3>
      <h3><i className="fas fa-trophy"></i>&nbsp;&nbsp;&nbsp;&nbsp; Awarded by The {magazines[getRandomNum(0, 6)]} magazine</h3>
      <h3><i className="fas fa-percent"></i>&nbsp;&nbsp;&nbsp;&nbsp; Discount for large groups</h3>
      <h3><i className="fas fa-shopping-basket"></i>&nbsp;&nbsp;&nbsp;&nbsp; Providing ingredients</h3>
      <h3><i className="fas fa-check"></i>&nbsp;&nbsp;&nbsp;&nbsp; Avg. response time {getRandomNum(2, 6)} hours</h3>
      <h3><i className="fas fa-user"></i>&nbsp;&nbsp;&nbsp;&nbsp; Member since {date}</h3>
    </div>
  )
}