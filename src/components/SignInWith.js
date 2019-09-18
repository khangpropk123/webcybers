import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import '../assets/SignInCSS.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

//import GoogleLogin from 'react-google-login';
import { 
    SignInUser,
    LoginUser,
    toggleClose,
    toggleOpen
 } from './../redux/actions/actions'

class SignInWith extends Component {

    render() {
    const responseGoogle = (res) => {
        let postData = {
            name: res.w3.ig,
            provider: 'google',
            email: res.w3.U3,
            provider_id: res.El,
            token: res.Zi.access_token,
            provider_pic: res.w3.Paa
        }
        // build our user data
        this.props.SignInUser(postData)
        this.props.toggleClose()
    }
    const responseFacebook = (res) => {
        let postData = {
            name: res.name,
            provider: 'facebook',
            email: res.email,
            provider_id: res.id,
            token: res.accessToken,
            provider_pic: res.picture.data.url
        }
        console.log(postData)
        // build our user data
        this.props.SignInUser(postData);
        this.props.toggleClose();
      }
    const loginSubmit=()=>{
        let user={
            userId: document.getElementById('user-id').value,
            password: document.getElementById('password').value
        }
        this.props.LoginUser(user);
        this.props.toggleClose();
        
        
    }
      const responseGoogles = (response) => {
        console.log(response);
      }
        return ( 
            <div>
                <div data-behavior="overlay" className={this.props.modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
        <button onClick={this.props.toggleClose} data-behavior="close-overlay" type="button" className="overlay-close"><span className="fa fa-times" aria-hidden="true"></span></button>
        <nav>
            <h2 className="grayed-heading center">Sign In</h2>
            <ul className="omniauth-button-group">

                <li className="omniauth-button google">
                    <GoogleLogin className="button google"
                    clientId="150152379241-mr09aqkae95jl3vl16fnduvbrt0nr8gc.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle} >
                        <i className="fa fa-google"></i><span> Sign In with Google</span>
                    </GoogleLogin>
                </li>
                <li className="omniauth-button google">
                <FacebookLogin className="button google"
                            appId="326101041631604" //APP ID NOT CREATED YET
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="btnFacebook"
                            icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}></i>}
                            textButton = "&nbsp;&nbsp;Sign In with Facebook"  
                        >
                </FacebookLogin>
                </li>
                <li>
                    <div> Or </div>
                </li>
                <li>
                    <TextField
                    id="user-id"
                    fullWidth
                    label="User Name"
                    variant="outlined"
                    margin="normal" 
                    />
                </li>
                <li>
                <TextField
                    id="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="small"
                    type="password"
                    autoComplete="current-password"
                    />
                </li>
                <li>
                    <button onClick={loginSubmit} className='login'>Login Now</button>
                </li>
            </ul>
        </nav>
    </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    }
}

export default connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignInUser,
    LoginUser
})(SignInWith);
