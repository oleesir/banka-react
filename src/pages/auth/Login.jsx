import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Auth.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../../components/layouts/Alerts';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [alertId, setAlertId] = useState();

  const{ register, handleSubmit, errors, formState: { isValid } } = useForm({ mode: 'onChange' });
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert, removeAlert } = alertContext;

  const clearFormError = () => {
    clearErrors();
    removeAlert(alertId);
  };

  const onSubmit = ({ email, password }) => {
    login({
      email,
      password
    });
  }

  const onChange = () => {
    clearFormError();
  }

  useEffect(() => {
    clearFormError();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/');
    }

    if (error) {
      const id = setAlert(error, 'danger');
      setAlertId(id);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  return (
    <div className="container auth-container">
    <div className="main">
            <header className="brand">
            Bank Of Olive
        </header>  
        <div className="auth-content">
            <h1 className="login-header">Login</h1>
            <Alert/>
            <div className="form-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      name="email"
                      type="email"
                      onChange={onChange} 
                      placeholder="Email" 
                      ref={register({
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                    })}/>
                    {errors.email && <small className="input-error">{errors.email.message}</small>}

                    <input
                      name="password"
                      type="password" 
                      onChange={onChange} 
                      placeholder="Password"
                      ref={register({
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password should not be less than 6 characters'
                        } 
                        })} 
                    />
                     <div>
                  {errors.password && <small className="input-error">{errors.password.message}</small>}
                  </div>
               
                  <input type='submit' className='btn btn-md login-bottom' disabled={!isValid} value='Login'/>
                    <div className="switch">
                        <p> Need an account?  <Link to="/signup" onClick={clearFormError} >Sign up</Link></p>
                        
                    </div>
                </form>
            </div>
        </div> 
        </div> 
    <div className="footer">
        <p>Olive &copy;2020</p>
    </div>    
</div>
  );
}

export default Login;