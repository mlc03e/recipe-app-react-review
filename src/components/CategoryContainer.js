import React from 'react'
import Category from './Category'
import v4 from 'uuid' // another way of generating unique ids (useful for keys)

class CategoryContainer extends React.Component {
  render() {
    // console.log(this.props.categories);
    return (
      <div>{this.props.categories.map(category => <Category key= {category.idCategory} category={category} handleRecipes={this.props.handleRecipes} />) }
</div>
    )
  }
}

export default CategoryContainer
