// import React, { Component } from "react";
// import { connect } from "react-redux";
// import LoadingComponent from "../../components/public_router/LoadingComponent/LoadingComponent";
// import { Route, Redirect, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { getStorageService } from "../../service/storeage-service";
// import { ckeckTokenService } from "../../service/login-service";

// class PrivateRoute extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       haveAcces: false,
//       loaded: false
//     };
//   }

//   componentDidMount() {
//     this.checkAcces();
//     console.log('a'+ this.state.loaded);
//   }

//   checkAcces = () => {
//     const { history } = this.props;

//     // your fetch request
//     if (this.props.auth === true) {
//       this.setState({
//         haveAcces: true,
//         loaded: true
//       });
//     }
//     else{
//       getStorageService("token").then(token => {
//         if (token !== null && token !== "token invalid") {
//           ckeckTokenService(token).then(statusToken => {
//             if (statusToken.status === 200) {
//                console.log('vao');
//               this.setState({
//                 haveAcces: true,
//                 loaded: true
//               });
//             }
//           });
//         } else {
//            console.log('k vao');
//           this.setState({
//             haveAcces: false,
//             loaded: false
//           });
//           history.push("/login");
//         }
//       });
//     }
//   };

//   render() {
//     console.log('have' +  this.state.haveAcces);
//     const { component: Component, ...rest } = this.props;
//     //const { loaded } = this.state;
//     //if (!loaded) return <LoadingComponent />;
//     return (
//       <Route
//         {...rest}
//         render={props => {
//           return this.state.haveAcces ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{ pathname: "/login", state: { from: props.location } }}
//             />
//           );
//         }}
//       />
//     );
//   }
// }

// export default withRouter(PrivateRoute);

// // PrivateRoute.propTypes = {
// //   userRole: PropTypes.string.isRequired,
// // };

// // https://stackoverflow.com/questions/49309071/react-private-router-with-async-fetch-request
