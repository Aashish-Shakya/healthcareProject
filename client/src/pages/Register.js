import React from "react";

import {Link, useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'

import "../styles/LoginStyles.css";
const Register = () => {
  //Form Handles

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const onFinishHandler =async (values) => {
        try{
          dispatch(showLoading());
          const res = await axios.post('/api/user/register', values)
          dispatch(hideLoading());
          if(res.data.success){
            message.success('Registerd Successfully!')
            navigate('/login')
          }else{
            message.error(res.data.message)
          }
    
        }catch(error){
          dispatch(hideLoading());
          console.log(error);
          message.error('Something Went Wrong')
        }
      };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="login-form"
        >
          <h3 className="text-center">Register Form</h3>

          <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="passwors" required></Input>
          </Form.Item>
          <Link to="/login" className="m-2">
            Exisiting User, Login Here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
