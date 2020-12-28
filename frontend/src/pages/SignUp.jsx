import React, { Component } from "react";
import { connect } from "react-redux";
import { cloudService } from "../services/cloudinary-service";

import { TextField, Button, Checkbox } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
} from "../store/actions/userActions";

class _SignUp extends Component {

  state = {
    msg: "",
    loginCred: {
      userName: "",
      password: "",
    },
    signupCred: {
      fullName: "",
      userName: "",
      password: "",
      joinedAt: Date.now(),
      imgUrl: "",
    },
    signAsChef: false,
  };

  onUploadImg = async (ev) => {
    const profilePic = await cloudService.uploadImg(ev);
    this.state.signupCred.imgUrl = profilePic.url
    this.setState({ signupCred: this.state.signupCred })
    console.log(this.state.signupCred.imgUrl);
  };

  loginHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value,
      },
    }));
  };

  doLogin = async (ev) => {
    ev.preventDefault();
    const { userName, password } = this.state.loginCred;
    if (!userName || !password) {
      return this.setState({ msg: "Please enter user/password" });
    }
    const userCreds = { userName, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { userName: "", password: "" } });
  };

  signupHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value,
      },
    }));
  };

  doSignup = (ev) => {
    ev.preventDefault();
    const { fullName, password, userName } = this.state.signupCred;
    if (!fullName || !password || !userName) {
      return this.setState({ msg: "All inputs are required!" });
    }
    const signupCreds = this.state.signupCred;
    console.log(signupCreds);
    this.props.signup(signupCreds);
    this.setState({
      signupCred: {
        ...this.state.signupCred,
        fullName: "",
        password: "",
        userName: "",
      },
    });
  };

  isChefHandleChange = () => {
    this.setState({
      signAsChef: !this.state.signAsChef,
    });
    console.log(this.state.signAsChef);
    if (!this.state.signAsChef) {
      const chef = {
        description: "",
        about: "",
        tags: [],
        imgs: [],
        location: {
          name: "",
          lang: 0,
          lat: 0,
        },
        price: 0,
        rating: 0,
        ratingNum: 0,
        reviews: [],
      }
      const signupCred = this.state.signupCred
      signupCred.chef = chef
      this.setState({ signupCred: signupCred })
    } else {
      const signupCred = this.state.signupCred
      delete signupCred.chef
      this.setState({ signupCred: signupCred })
    }
    console.log(this.state.signupCred);
  };

  render() {

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#1dbf73'
        },
        text: {
          primary: "#000000",
          secondary: "#b2b2b2"
        }
      },
      typography: {
        fontFamily: 'montserrat'
      }
    });

    let signupSection = (

      <form onSubmit={this.doSignup}>

        <div className="sign flex-col">

          <MuiThemeProvider theme={theme}>
            <TextField type="text" name="fullName" onChange={this.signupHandleChange} placeholder="Full Name" value={this.state.signupCred.fullName} variant="outlined" noValidate autoComplete="off" />

            <TextField type="text" name="userName" onChange={this.signupHandleChange} placeholder="User Name" value={this.state.signupCred.userName} variant="outlined" noValidate autoComplete="off" />

            <TextField type="password" name="password" onChange={this.signupHandleChange} placeholder="User Password" value={this.state.signupCred.password} variant="outlined" noValidate autoComplete="off" />

            <Button variant="contained" component="label">Upload Profile Picture <TextField type="file" style={{ display: "none" }} onChange={this.onUploadImg}/></Button>

          </MuiThemeProvider>

        </div>

        <div>
          <MuiThemeProvider theme={theme}>

            <label>Sign Up As Chef</label>

            <Checkbox
              checked={this.state.signAsChef}
              onChange={this.isChefHandleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />

          </MuiThemeProvider>
        </div>

        <div>
          {this.state.signAsChef}
        </div>

        <button>Signup</button>

      </form>
    );

    let loginSection = (

      <form onSubmit={this.doLogin}>

        <div className="log flex-col">

          <MuiThemeProvider theme={theme}>
            <TextField type="text" name="userName" onChange={this.loginHandleChange} placeholder="User Name" value={this.state.loginCred.fullName} variant="outlined" noValidate autoComplete="off" />

            <TextField type="password" name="password" onChange={this.loginHandleChange} placeholder="Password" value={this.state.loginCred.password} variant="outlined" noValidate autoComplete="off" />
          </MuiThemeProvider>

          <button>Login</button>

        </div>

      </form>
    );

    const { loggedInUser } = this.props;

    return (

      <div className="sign-up main-container">

        <div className="sign-up-container">

          <h3>We are pleased to welcome you on FoodVentures</h3>
          <h3>Please Login or Signup</h3>

          <h2>{this.state.msg}</h2>

          {loggedInUser && (
            <div>
              <h2>Welcome: {loggedInUser.userName} </h2>
              <button onClick={this.props.logout}>Logout</button>
            </div>
          )}

          {!loggedInUser && loginSection}
          {!loggedInUser && signupSection}

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    loggedInUser: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);