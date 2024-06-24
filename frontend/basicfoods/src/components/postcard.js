import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';

const { Meta } = Card;

class PostCard extends React.Component {

  /*constructor(props) {
    super(props);
    //this.handleNav = this.handleNav.bind(this);
  }*/

  /*handleNav() {
    console.log(`clicked post ${this.props.id}`);
  }*/

  render() { // directs user to full recipe when clicking a recipe image
    const recipeID = this.props.ID;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Recipe ${recipeID}`} src={this.props.image} to={`/recipe/${recipeID}`} />}
        hoverable={true}>
        <Meta title={this.props.recipe} />
      </Card>
    );
  }
}

export default PostCard;
