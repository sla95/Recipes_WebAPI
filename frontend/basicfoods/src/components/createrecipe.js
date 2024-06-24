import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { status, json } from '../utilities/requestHandlers';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const IDRules = [
    { required: true, message: 'Please input any number!' }
];

const dietRules = [
    { required: true, message: 'Please enter diet requirements!', whitespace: true }
];

const recipeRules = [
    { required: true, message: 'Please enter recipe name!', whitespace: true }
];

const userIDRules = [
    { required: true, message: 'Please enter your User ID!', whitespace: true }
];

/**
 * Recipe form component.
 */
class RecipeForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('https://elementstudent-gibsonoctober-3000.codio-box.uk/api/v1/recipes', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // TODO: display success message and/or redirect
        console.log(data);
        alert("Recipe Added")
    })
    .catch(error => {
        // TODO: show nicely formatted error message and clear form
        alert(`Error: ${JSON.stringify(error)}`);
    });  
  };
  
  render() { // recipe form to add recipes into the backend database once connected
    return (
        <Form {...formItemLayout} name="createrecipe" onFinish={this.onFinish} scrollToFirstError >  
            <h1 style={{color: "darkblue"}}><p align="center">Enter details!</p></h1>
            <Form.Item name="ID" label="Recipe Number" rules={IDRules} >
                <Input />
            </Form.Item>

            <Form.Item name="diet" label="Diet" rules={dietRules} >
                {/*<Select>
                    <Select.Option value="vegetarian">Vegetarian</Select.Option>
                    <Select.Option value="vegan">Vegan</Select.Option>
                    <Select.Option value="meat">Meat</Select.Option>
                </Select>*/}
                <Input />
            </Form.Item>

            <Form.Item name="recipe" label="Recipe Name" rules={recipeRules} >
                <Input />
            </Form.Item>

            <Form.Item name="recipetext" label="Recipe" >
                <Input />
            </Form.Item>

            <Form.Item name="image" label="Recipe Image" >
                <Input type = "text"/>
            </Form.Item>

            <Form.Item name="userID" label="Enter your User ID" rules={userIDRules} >
                <Input />
            </Form.Item>

            <Form.Item name="mealtype" label="Meal Type" >
                {/*<Select>
                    <Select.Option value="breakfast">Breakfast</Select.Option>
                    <Select.Option value="brunch">Brunch</Select.Option>
                    <Select.Option value="lunch">Lunch</Select.Option>
                    <Select.Option value="dinner">Dinner</Select.Option>
                    <Select.Option value="snack">Snack</Select.Option>
                </Select>*/}
                <Input />
            </Form.Item>
            
            <br />
            <br />

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Create Recipe
                </Button>
            </Form.Item>
        </Form>
    );
  };
};

export default RecipeForm;
 
