
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Dialog extends Component {

    render() {
        return (
          <form>
            <input
              type="text"
            />
          </form>
        );
      }
}

export default Dialog;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Dialog />, wrapper) : false;