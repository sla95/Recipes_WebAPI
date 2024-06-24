import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import { status, json } from '../utilities/requestHandlers';

class RecipeGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [] // stores all the recipes added in the database
    }
  }

  componentDidMount() {
    fetch('https://elementstudent-gibsonoctober-3000.codio-box.uk/api/v1/recipes')
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ recipes: data })
    /*this.setState({
      recipes: require('../data/recipeslist.json')*/
    })
    .catch(err => console.log("Error finding recipes"));
  }

  render() {
    if (!this.state.recipes.length) {
      return <h3>Loading recipes...</h3>
    }
    // the next line does the Array.map() operation on the recipes
    // to create an array of React elements to be rendered
    const cardList = this.state.recipes.map(post => {
      return (
        <div style={{padding:"15px"}} key={post.ID}>
          <Col span={6}>
            <PostCard {...post} />
          </Col>
        </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default RecipeGrid;