import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = ({value, text, color}) => {
  const fullStars = Math.floor(value);
//   if value's decimal > 0.5 then give 1 full star....else 0 star 
  const halfStar = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStar;
  
    return (
    <div className='flex items-center'>
        { // Full-star
            [...Array(fullStars)].map((_,i) => (
                <FaStar key={i} className={`text-${color} ml-1`} />
            ))
        }
        { // Half-star
            halfStar == 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />
        }
        { // Empty-star
            [...Array(emptyStar)].map((_, i) => (
                <FaRegStar key={i} className={`text-${color} ml-1`} />
            ))
        }
        <span className={`rating-text ml-{2rem} text-${color}`}>{text && text}</span>
    </div>
  )
}

Ratings.defaultProps = {
    color : 'yellow-500',
}
export default Ratings