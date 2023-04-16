import React, { useEffect, useState } from "react";
import './LoginComponent.scss';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRequest } from '../../utils/API';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    userName: '',
    password: ''
  });

  const handleInputChange = (event: any) => {
    const {value, name} = event.target;
    setFormData({
      ...formData,
      [name]: value  
    });
  };

  const handleSubmit = async () => {
    if(formData.userName && formData.password) {
      let params =  {
        UserName: formData.userName,
        Password: formData.password
      }
      const loginResponse = await fetchRequest('POST', 'login', params, false);
      localStorage.setItem('userInfo', JSON.stringify(loginResponse));
      navigate('/ourservice');
    }
  };

  useEffect(() => {
    let isLogin = localStorage.getItem('userInfo')
    if(isLogin) {
      navigate('/ourservice');
    }
  }, [])

  return (
    <section className='d-flex justify-content-center align-items-center' id='login'>
      <div className="login-container">
        <h1 className="h3 mb-3 text-center">Admin sign in</h1>
        <div className="form-floating mt-5">
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            placeholder="username"
            value={formData.userName}
            onChange={handleInputChange}
          />
          <label htmlFor="userName">Username</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="checkbox mt-4">
          <label className='text-right'>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mt-4" type="button" onClick={handleSubmit}>
          Sign in
        </button>
        <div className='d-flex justify-content-center'>
          <Link className='mt-5 text-center' to='/'>Go Back</Link>
        </div>
      </div>
    </section>

  );
};

export default LoginComponent;
