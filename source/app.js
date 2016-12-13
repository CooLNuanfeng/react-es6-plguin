import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Dialog from '../components/dialog/dialog.js';

var dialogConfig = {
    type: 'loading',
    text : 'waiting'
}


class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : props.show ? props.show : false,
            text : props.text,
            type : props.type
        }
    }
    render(){
        var config = null;
        switch (this.state.type) {
            case 0:
                config = {
                    text : 'loading',
                    type : 'loading'
                }
                break;
            case 1:
                config = {
                    text : 'waiting',
                    type : 'waiting'
                }
                break;
        }
        return(
            <div style={{margin:'10px'}}>
                <button className="btn btn-block btn-primary" onClick={this.clickFn.bind(this)}>{this.state.text}</button>
                <Dialog config={config} show={this.state.show} onHide={this.hide.bind(this)}/>
            </div>
        )
    }
    clickFn(){
        this.setState({
            show : true
        })
    }
    hide(){
        this.setState({
            show : false
        })
    }
}

class Buttons extends Component{
    constructor(props){
        super(props);
        this.state = {
            buttons : props.data
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.buttons.map((item,index) => {
                        return (
                            <Button key={index} text={item.text} type={item.type} />
                        )
                    })
                }
            </div>
        )
    }
}

var buttonData = [
    {text:'toast提示框',type:0},
    {text:'带图标的toast提示框',type:1},
]

const App = (props) => {
  return (
      <Buttons data={buttonData}/>
  );
}

ReactDOM.render(<App />,document.getElementById('demo'));
