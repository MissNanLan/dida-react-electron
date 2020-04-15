
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ipcRenderer } from 'electron';

class Dialog extends Component {

  constructor(){
    super();
    this.state = {
        time: '',
        message:''
    }                
  }

  componentDidMount = () =>{
    setInterval(()=>{
        var time = new Date().toLocaleString();
        this.setState({
            time
        });                    
    }, 1000);
    ipcRenderer.on('dataJsonPort',(event, message)=>{
        this.setState({
            message:message
        })
    })
  }

    render() {
        const {message} = this.state
        return (
          <div>
            {message?message:'no message'}
          </div>
        );
      }
}

export default Dialog;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Dialog />, wrapper) : false;