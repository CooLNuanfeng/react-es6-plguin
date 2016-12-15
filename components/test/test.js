import React,{Component} from 'react';

import './test.scss';

export default class SimpleComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
    }
    componentDidMount(){
        var num = this.state.count;
        this.interval = setInterval(function(){
            this.setState({
                count : num++
            })
        }.bind(this),1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        return(
            <div style={this.props.customStyle}>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
                <p>当前计算状态：{this.state.count}</p>
                <button className="btn btn-block btn-success">这是一个按钮</button>
            </div>
        )
    }
}
//defaultProps 是设置 prop 属性的默认值，而非 state 的默认值
SimpleComponent.defaultProps = {
    content : 'This is a React Component',
}
