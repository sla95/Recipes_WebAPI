import React from 'react';
import { Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;

const grid = (
  <>
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Link to="/post/1">
        <Card hoverable cover={<img alt="recipe1" src=""/>}>
          <Meta title="1st Post" description="This is about something" />
        </Card>
      </Link>
    </Col>
    <Col span={6}>
      <Link to="/post/2">
        <Card hoverable cover={<img alt="recipe2" src=""/>}>
          <Meta title="2nd Post" description="This is about something" />
        </Card>
      </Link>
    </Col>
  </Row>  
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Link to="/post/3">
        <Card hoverable cover={<img alt="recipe3" src=""/>}>
          <Meta title="3rd Post" description="This is about something" />
        </Card>
      </Link>
    </Col>
    <Col span={6}>
      <Link to="/post/4">
        <Card hoverable cover={<img alt="recipe4" src=""/>}>
          <Meta title="4th Post" description="This is about something" />
        </Card>
      </Link>
    </Col>
  </Row>  
  </>
);

function PostGrid(props) {
  return grid;
}

export default PostGrid;