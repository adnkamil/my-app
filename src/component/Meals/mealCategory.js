import React from "react";
import { useNavigate } from "react-router-dom"
import "./card.css";

export default function MealCategory({ meals }) {
  const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = meals;
  const navigate = useNavigate()

  const handleDetailMeal= () => {
    navigate(`/list/${strCategory}`)
  }

  return (
    <>
      <div className="card" onClick={handleDetailMeal}>
        <h2>{strCategory}</h2>
        <img src={strCategoryThumb} style={{width:250}} />
      </div>
    </>
  );
}
