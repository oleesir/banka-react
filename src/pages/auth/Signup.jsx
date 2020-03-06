import React,{ useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Auth.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../../components/layouts/Alerts';



const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [alertId] = useState();

  const{ register, handleSubmit, errors, formState: { isValid } } = useForm({ mode: 'onChange' });
  const { signUp, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert, removeAlert, alerts } = alertContext;

  const clearFormError = () => {
    clearErrors();
    removeAlert(alertId);
  };

  const onChange = () => {
    clearErrors();
    removeAlert(alerts[0]?.id);
  }

  const onSubmit = ({ firstName, lastName, email, password, phoneNumber, address, city }) => {
    signUp({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      city
    });
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
      setAlert(error, 'danger', 'form-error');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  return (
    <div className='container auth-container'>
      <div className='main'>
          <header className='brand' >
                Bank of olive
          </header>
          <div className='auth-content'>
          <h1 className='login-header'>Sign Up</h1>
            <Alert/>
            <div className='form-content'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type='text' 
                  name='firstName'
                  placeholder='Firstname'
                  onChange={onChange}
                  ref={register({
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: 'First name should contain only letters'
                    } 
                  })}/>
                {errors.firstName && <small className="input-error">{errors.firstName.message}</small>}
          

                <input type='text' 
                name='lastName'
                 placeholder='Lastname'
                 onChange={onChange}
                 ref={register({
                  required: 'Last name is required',
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: 'Last name should contain only letters'
                  } 
                })}/>
                {errors.lastName && <small className="input-error">{errors.lastName.message}</small>}
                
                <input type='email' 
                name='email'
                placeholder='Email'
                onChange={onChange}
                ref={register({
                  required: 'Email is required',
                  pattern: {
                    value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email address'
                  } 
                })}/>
                {errors.email && <small className="input-error">{errors.email.message}</small>}

                <input type='password' 
                  name='password'
                  placeholder='Password'
                  onChange={onChange}
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

                  <input type='tel' 
                  name='phoneNumber'
                  placeholder='Phone number'
                  onChange={onChange}
                  ref={register({
                    required: 'Phone number is required' 
                    })}
                  />
                  <div>
                  {errors.phoneNumber && <small className="input-error">{errors.phoneNumber.message}</small>}
                  </div>

                  <input
                  type='text' 
                  name='address'
                  placeholder='Address'
                  onChange={onChange}
                  ref={register({
                    required: 'Address is required',
                  })}/>
                {errors.address && <small className="input-error">{errors.address.message}</small>}

                <input
                  type='text' 
                  name='city'
                  placeholder='City'
                  onChange={onChange}
                  ref={register({
                    required: 'City is required',
                  })}/>
                {errors.city && <small className="input-error">{errors.city.message}</small>}
               
                  <input  type='submit' className='btn btn-md login-bottom' disabled={!isValid} value='Sign up'/>
                <div className='switch'>
                    <p> Already have an account?  <Link to='/login' onClick={clearFormError}>Login</Link></p>
                      
                </div>
              </form>
            </div>
          </div>
      </div>
      <div className='footer'>
      <p>Olive ©2020</p>
      </div>
    </div>
  );
}

export default Signup;