import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './card.css'

export default function MealDetail() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setData(data.meals))
      .finally(_=> setLoading(false))
  },[])

  const backPage = () => {
    navigate('/')
  }

  if(loading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={backPage}>Back</button>
      <br/>
      {data && data.map(meal => (
        <div className='card' key={meal.idMeal.toString()}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} style={{height:200}}/>
        </div>
      ))}
    </div>
  )
}
