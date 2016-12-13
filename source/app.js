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
            text : props.text,
            type : props.type
        }
    }
    render(){
        return(
            <button className="btn btn-block btn-primary" onClick={this.clickFn.bind(this,this.state.type)}>{this.state.text}</button>
        )
    }
    clickFn(type){
        var config = null;
        switch (type) {
            case 0:
                config = {
                    type : 'loading',
                    text : 'loading'
                }
                break;
            case 1 :
                config = {
                    type : 'warning',
                    text : 'warning'
                }
                break;
        }
        ReactDOM.render(<Dialog config={config}/>,document.getElementById('mask'));

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
