import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Dialog from '../components/dialog/dialog.js';



class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : props.show ? props.show : false,
            text : props.text,
            id : props.id
        }
    }
    render(){
        var config = null;
        switch (this.state.id) {
            case 0:
                config = {
                    text : 'toast提示信息',
                    enabledMask : true,
                }
                break;
            case 1:
                config = {
                    text : 'toast提示信息',
                    type : 'success',
                    enabledMask : true,
                }
                break;
            case 2:
                //trigger 是否阻止冒泡 使 dialog 关闭
                config = {
                    text : 'waiting Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    textAlign : 'left',
                    type : 'warning',
                    buttons : [
                        {
                            type:'success',
                            text:'确定',
                            disTrigger: true,
                            buttonStyle: {
                                width : '100px'
                            },
                            callback:function(){
                                console.log('ok callback');
                            }
                        },
                        {
                            type:'default',
                            text:'取消',
                            callback:function(){
                                console.log('cancel callback');
                            }
                        }
                    ]
                }
                break;
            case 3:
                config = {
                    text :'loading',
                    type : 'loading',
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
        if(this.state.id==3){
            setTimeout(function(){
                this.hide();
            }.bind(this),3000);
        }
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
                            <Button key={index} text={item.text} id={item.id} />
                        )
                    })
                }
            </div>
        )
    }
}

var buttonData = [
    {text:'toast提示框',id:0},
    {text:'带图标的toast提示框',id:1},
    {text:'带图标和按钮的提示框',id:2},
    {text:'toast提示框延时3s消失',id:3}
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
            type : 'loading',
            text : 'loading...',
            enabledMask : true,
        }
        return (
            <Dialog config={config} show={this.state.show} onHide={null}/>
        )
    }
    componentDidMount(){
        // var _this = this;
        // $.ajax({
        //     url : './phpData/data.php',
        //     type: 'GET',
        // })
        // .done(function(res) {
        //     _this.setState({
        //         show : false
        //     })
        // });
        setTimeout(function(){
            this.setState({
                show : false
            })
        }.bind(this),3000)

    }
    close(){
        this.setState({
            show : false
        })
    }
}

class ButtonOne extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow : false
        }
    }
    render(){
        var config = {
            'text' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'textAlign' : 'left',
            'buttons' : [
                {
                    'type' : 'warning',
                    'text' : '确定',
                    callback : function(){
                        console.log('ok');
                    }
                }
            ]
        }
        return(
            <div style={{margin:'10px'}}>
                <button onClick={this.open.bind(this)} className="btn btn-success btn-block">普通按钮dialog使用示例</button>
                <Dialog config={config} show={this.state.isShow} onHide={this.hiden.bind(this)} />
            </div>
        )
    }
    open(){
        this.setState({
            isShow : true
        })
    }
    hiden(){
        this.setState({
            isShow : false
        })
    }
}


class ButtonTwo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow : false
        }
    }
    render(){
        var config = {
            'text' : 'loading',
            'type' : 'loading',
        }
        return(
            <div style={{margin:'10px'}}>
                <button onClick={this.open.bind(this)} className="btn btn-success btn-block">获取数据按钮dialog使用示例</button>
                <Dialog config={config} show={this.state.isShow} onHide={this.hiden.bind(this)} />
            </div>
        )
    }
    open(){
        var _this = this;
        this.setState({
            isShow : true
        });
        $.ajax({
            url : './phpData/data.php',
            type: 'GET',
        })
        .done(function() {
            _this.setState({
                isShow : false
            })
        })
    }
    hiden(){
        this.setState({
            isShow : false
        })
    }
}

ReactDOM.render(<ButtonOne />,document.getElementById('btn1'));
ReactDOM.render(<ButtonTwo />,document.getElementById('btn2'));
ReactDOM.render(<App />,document.getElementById('demo'));
ReactDOM.render(<ToastMask />,document.getElementById('toast'));
