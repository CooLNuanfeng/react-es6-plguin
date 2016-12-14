import React,{Component,propTypes} from 'react';

import './dialog.scss';

class DialogImg extends Component{
    render(){
        if(this.props.type){
            var type = 'nf-dialog-header nf-dialog-'+this.props.type;
            return (
                <div className={type}></div>
            )
        }else{
            return null;
        }
    }
}

class DialogBody extends Component{
    render(){
        if(this.props.text){
            return (
                <div className="nf-dialog-body" style={{textAlign:this.props.align}}>{this.props.text}</div>
            )
        }else{
            return null;
        }
    }
}

class DialogButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            buttons : props.buttons
        }
    }
    render(){
        var _this = this;
        if(this.state.buttons){
            return(
                <div className="nf-dialog-footer">
                    {
                        this.state.buttons.map(function(item,index){
                            var flag = item.trigger ? false : true;
                            var customBtnStyle = item.buttonStyle ? item.buttonStyle : null;
                            return (
                                <button style={customBtnStyle} key={index} className={'btn btn-'+item.type} onClick={_this.btnClick.bind(_this,item.callback,flag)}>{item.text}</button>
                            )
                        })
                    }
                </div>
            )
        }else{
            return null;
        }
    }
    btnClick(cb,flag,event){
        if(!flag){
            event.stopPropagation();
        }
        if(cb){
            cb();
        }
    }
}

export default class Dialog extends Component {
    constructor(props){
        super(props);
        // default config
        this.state = {
            show : props.show,
            type : props.config.type || '',
            text : props.config.text || '',
            textAlign : props.config.textAlign || 'center',
            buttons : props.config.buttons || null,
            opacity : props.config.opacity || .5,
            delay : props.config.delay || false
        }
        this.delayInter = null;
    }
    render(){
        var show = this.props.show;
        if(show){
            return (
                <div className="nf-dialog-mask" style={{background:'rgba(0,0,0,'+this.state.opacity+')'}} onClick={this.close.bind(this)}>
                    <div className="nf-dialog">
                        <div className="nf-dialog-warp">
                            <DialogImg type={this.state.type} />
                            <DialogBody text={this.state.text} align={this.state.textAlign}/>
                            <DialogButton buttons={this.state.buttons} />
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
    componentWillUpdate(){
        //延时关闭
        if(this.state.delay){
            //一定要在此处关闭，因为关闭时state的变化也会触发render和 该 componentWillUpdate 方法，如果不在这里关闭而在 close中关闭 只会关闭上一个，本次又会开启个定时器，因此 log 会一直输出变成了 setInterval的效果 注意 setTimeout的返回值一定要挂载到 this 上，否则 也会是 setInterval的效果,不用 var 定义的变量存定时器返回值，只因为js 会将 异步函数延迟执行 (js执行原理) 此时该变量已经变成下个定时器了
            this.delayInter = window.setTimeout(function(){
                this.close();
                console.log('count');
                clearTimeout(this.delayInter);
                //this.close();
            }.bind(this),this.state.delay);
        }
    }
    close(){
        if(this.props.onHide){
            //clearTimeout(this.delayInter);
            this.props.onHide();
        }
    }

}
Dialog.propTypes = {
    config : React.PropTypes.object.isRequired
}
