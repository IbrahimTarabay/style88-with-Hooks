import React,{useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';

import './sign-in.scss';

const SignIn = ({emailSignInStart,googleSignInStart})=>{
  
 const [userCredentials,setCredentials] = useState({email:'',password: ''})
 const {email,password} = userCredentials;

  const handleSubmit = async event =>{
    event.preventDefault();
    /*to have control and prevent default behavior*/ 
    emailSignInStart(email,password);
  };

  const handleChange = event =>{
    const {value,name} = event.target;
    setCredentials({...userCredentials,[name]:value})
    /*[name] to dynamically work with any name*/ 
  }

    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
           name="email"
           type="email"
           label="Email"
           value={email}
            handleChange={handleChange}
             required />
    
          <FormInput 
          name="password" 
          type="password"
          label="Password"
           value={password}
            handleChange={handleChange}
             required />
          
          <div className='buttons'>
          <CustomButton type='submit'>Sign in {/*children*/}</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>{/*isGoogleSignIn = true by default*/}
                  Sign in with Google
            </CustomButton> 
          </div>
        </form>
      </div>
    );
}

const mapDispatchToProps = dispatch =>({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);