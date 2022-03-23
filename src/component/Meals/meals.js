import React, { useState, useEffect } from "react";
import MealCategory from "./mealCategory";
import "./out.css"

function Meals() {
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setMeals(data.categories))
      .catch((err) => setError(err))
      .finally((_) => setLoading(false));
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <div className="container-meal">
      <h1>List category meal you can eat</h1>
      {meals &&
        meals.map((meal) => (
            <MealCategory key={meal.idCategory.toString()} meals={meal}/>
        ))}
    </div>
  );
}

export default Meals;
