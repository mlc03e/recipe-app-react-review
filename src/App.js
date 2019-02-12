import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Header from './components/Header'
import CategoryContainer from './components/CategoryContainer'
import RecipeContainer from './components/RecipeContainer'


class App extends Component {
  state= {
    categories: [],
    recipes: [],
    myRecipes: [],
    textValue: ''
  }

  componentDidMount() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(categories => this.setState({
      categories: categories.categories
    }))
  }
  handleRecipes= (categoryName) => {
    // console.log(categoryName)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then(response => response.json())
    .then(recipes => {
      const updatedRecipes = recipes.meals.map(recipe => {
        return {...recipe, selected: false}
      })
      this.setState({
        recipes: updatedRecipes
      })
    }
    )
  }
  showMyRecipe= (recipeId) => {
    const findMyRecipe = this.state.recipes.find(recipe => recipe.idMeal === recipeId)
    const filterRecipes= this.state.recipes.filter(recipe => recipe.idMeal !== recipeId )

    const updatedRecipes = this.state.recipes.map(recipe => {
      if (recipe.idMeal === recipeId) {
        recipe.selected = !recipe.selected
        return recipe
      } else {
        return recipe
      }
    })

    this.setState({
      recipes: updatedRecipes
    })
    // if (!this.state.myRecipes.includes(findMyRecipe)) {
    //   this.setState({
    //     myRecipes: [...this.state.myRecipes, findMyRecipe],
    //     recipes: filterRecipes
    //   })
    // } else {
    //   this.setState({
    //     myRecipes: filterRecipes,
    //     recipes: [...this.state.recipes, findMyRecipe]
    //   })
    // }
  }
  // hideMyRecipe= () => {
  //   const hideRecipe= this.state.recipes.filter(recipe => rec)
  // }
  searchRecipes= (event) => {
    this.setState({
      textValue: event.target.value
    })
  }
  searchResults= () => {
    return this.state.categories.filter(cat => cat.strCategory.toLowerCase().includes(this.state.textValue.toLowerCase()))

  }
  render() {
    return (
      <div>
        <Header recipes= {this.state.recipes} searchRecipes={this.searchRecipes}/>

        <Row>
          <Col s={4} className='grid-example'>
            <h4>Categories</h4>
            <CategoryContainer categories= {this.searchResults()} handleRecipes= {this.handleRecipes} />
          </Col>

          <Col s={4} className='grid-example'>
            <h4>Recipes</h4>
            <RecipeContainer recipes={this.state.recipes.filter(recipe => !recipe.selected)} showMyRecipe={this.showMyRecipe}/>
          </Col>

          <Col s={4} className='grid-example'>
            <h4>My Recipes</h4>
            <RecipeContainer recipes= {this.state.recipes.filter(recipe => recipe.selected)} showMyRecipe={this.showMyRecipe}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
