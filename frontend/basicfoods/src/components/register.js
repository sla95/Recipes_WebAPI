import React from 'react';
import { Form, Input, Button } from 'antd';
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
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
];

const roleRules = [
    { required: false, message: 'Role not taken' }
];

/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('https://elementstudent-gibsonoctober-3000.codio-box.uk/api/v1/users', {
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
        alert("User added")
    })
    .catch(error => {
        // TODO: show nicely formatted error message and clear form
        alert(`Error: ${JSON.stringify(error)}`);
    });  
  };
  
  render() { // register form that adds users into the backend database once connected
    return (
      <Form {...formItemLayout} name="register" initialValues={{ role: 'user' }} onFinish={this.onFinish} scrollToFirstError >
        <h1 style={{color: "darkblue"}}><p align="center">Enter details!</p></h1>
        <Form.Item name="email" label="E-mail" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
            hasFeedback rules={confirmRules} >
            <Input.Password />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={roleRules}>
            <Input disabled />
        </Form.Item>
        
        <br />
        <br />

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default RegistrationForm;
 
