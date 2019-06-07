import React, { Component } from "react";
import "../../../../styles/mainconfig.css";
import "../../../../styles/main.css";
import axios from 'axios';

class ManageDiscountComponent extends Component {
  componentDidMount(){
    axios.get('https://tuha.vn/vichat-auth/0Auth.php?cmd=get_all_user&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.IntcInVzZXJfaWRcIjpcIjI2NDZcIixcImlkXCI6XCJkaW5oa2trXCIsXCJ0eXBlXCI6XCJVU0VSXCIsXCJncm91cF9pZFwiOlwiMTEzNVwiLFwiYWRtaW5fZ3JvdXBcIjpcIjFcIixcImNyZWF0ZV9kYXRlXCI6XCIyMDE4LTAzLTE3XCIsXCJsYXN0X29ubGluZV90aW1lXCI6XCIxNTU3ODMwODYwXCIsXCJpc19hY3RpdmVcIjpcIjFcIixcImtpbmRcIjpcIjFcIixcImVtYWlsXCI6XCJkYW5na2hvYTExMTE1QGdtYWlsLmNvbVwiLFwiZnVsbF9uYW1lXCI6XCJOZ3V5XFx1MWVjNW4gXFx1MDExMFxcdTAxMDNuZyBLaG9hXCJ9Ig.xCR_oLHvlM3YDHOwlc-Yhp9gJYhZe_MsSqpepoxr4WbEyPHYXPBHzrNazHzlWBcNqTG72N5yvtYiS5rug90jww')
    .then(data => {
      let arr = Object.values(data.data);
      let newArr = arr.map(Element => Element);
      console.log(newArr)
    })
  }
  render() {
    return (
      <div className="Home-component">
      
          <div
            className="container-login100"
          >
            <p>ManageDiscountComponent</p>
          </div>
 
      </div>
    );
  }
}

export default ManageDiscountComponent;
