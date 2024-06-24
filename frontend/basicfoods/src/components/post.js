import React from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Row, Col, Typography } from 'antd'
import { status, json } from '../utilities/requestHandlers';

const { Title, Paragraph } = Typography;

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: undefined
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()

    fetch(`https://elementstudent-gibsonoctober-3000.codio-box.uk/api/v1/recipes/${id}`)
    .then(status)
    .then(json)
    .then(post => {
      this.setState({post:post})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  render() {
    if (!this.state.post) {
      return <h3>Loading recipe...</h3>
    }
    const post = this.state.post;

    return ( // how a full recipe page should look
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={500} alt="Post" src={post.image} />
          </Col>
          <Col span={17}>
            <Title>{post.recipe}</Title>
            <Paragraph>{post.recipetext}</Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Post);
