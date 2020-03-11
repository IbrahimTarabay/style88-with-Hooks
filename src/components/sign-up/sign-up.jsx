import React,{useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {signUpStart} from '../../redux/user/user.actions';

import './sign-up.scss';

const SignUp = ({signUpStart})=> {
  const [userCredentials,setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const {displayName,email,password,confirmPassword} = userCredentials;
  
  const handleSubmit = async event =>{
    event.preventDefault();
    if(password !== confirmPassword){
      alert("passwords don't match");
      return;
    }
    signUpStart({displayName,email,password});
  };

  const handleChange = event =>{
    const {name,value} = event.target;
    setUserCredentials({...userCredentials,[name]:value});
    /*[name]: value to dynamically change the name*/
  }

    return(
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            handleChange={handleChange}
            label='Display Name'
            required
            >
           </FormInput>
           {/*email*/}
           <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
            label='Email'
            required
            />
           {/*password*/}
           <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
            label='Password'
            required
            />
           {/*confirm password*/}
           <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            handleChange={handleChange}
            label='Confirm Password'
            required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </form>
         </div>
      )
    }
  
  const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
  });

  export default connect(null,mapDispatchToProps)(SignUp);