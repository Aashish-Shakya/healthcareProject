import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios'
import '../styles/LoginStyles.css'

import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
const Login = () => {
  //Form Handles
 const navigate = useNavigate();
 const dispatch = useDispatch();
  const onFinishHandler =async (values) => {
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/user/login', values);
      window.location.reload();
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('Login Successfully!')
        navigate('/')
      }else{
        message.error(res.data.message)
      }

    }catch(error){
      dispatch(hideLoading())
      console.log(error);
      message.error('Something Went Wrong')
    }
  };
  return (
    <>
      <div className="form-container">
       <Form layout="vertical" onFinish={onFinishHandler} className="login-form">
        <h3 className="text-center">Login Form</h3>
           
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="passwors" required></Input>
          </Form.Item>
<Link to='/register' className="m-2">Not a user, Register here</Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          </Form>
      </div>
    </>
  );
};

export default Login;
