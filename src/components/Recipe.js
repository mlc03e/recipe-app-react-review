import React from 'react'
import { Card, CardTitle } from 'react-materialize'
import v4 from 'uuid'

const Recipe = (props) => {
  // console.log(props)
  return (
    <Card
      key={v4()}
      header={<CardTitle key={v4()} image={props.recipe.strMealThumb} />}
      title={props.recipe.strMeal}
      onClick={()=>props.showMyRecipe(props.recipe.idMeal)}
    />
  )
}

export default Recipe
