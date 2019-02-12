import React from 'react'
import Recipe from './Recipe'
import v4 from 'uuid' // another way of generating unique ids (useful for keys)

class RecipeContainer extends React.Component {

  render() {
    // console.log(this.props.recipes)
    return (
      <div>{this.props.recipes ? this.props.recipes.map(recipe => <Recipe recipe={recipe} key= {recipe.idMeal} showMyRecipe={this.props.showMyRecipe}/>) : null}</div>
    )
  }
}

export default RecipeContainer
