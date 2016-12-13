import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Dialog from '../components/dialog/dialog.js';



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
                    type : 'waiting',
                    buttons : [
                        {type:'success',text:'确定',callback:function(){console.log('ok callback');}},
                        {type:'default',text:'取消',callback:function(){console.log('cancel callback');}}
                    ]
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

class ToastMask extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }
    render(){
        var config = {
            type : 'warning',
            text : 'warning'
        }
        return (
            <Dialog config={config} show={this.state.show} />
        )
    }
    componentDidMount(){
        var _this = this;
        setTimeout(function(){
            _this.setState({
                show : false
            })
        },3000);
    }
}

ReactDOM.render(<App />,document.getElementById('demo'));
ReactDOM.render(<ToastMask />,document.getElementById('toast'));
