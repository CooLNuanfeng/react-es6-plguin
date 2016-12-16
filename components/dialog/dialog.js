import React,{Component,propTypes} from 'react';

import './dialog.scss';

class DialogImg extends Component{
    render(){
        if(this.props.type){
            var type = 'nf-dialog-icon nf-dialog-'+this.props.type;
            return (
                <div className={type} onClick={(e)=>{e.stopPropagation()}}></div>
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
                <div className="nf-dialog-body" style={{textAlign:this.props.align}} onClick={(e)=>{e.stopPropagation()}}>{this.props.text}</div>
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
                            var flag = item.disTrigger ? false : true;
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
        this.props.clickFn(!flag)
    }
}

export default class Dialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            type : props.config.type || '',
            text : props.config.text || '',
            textAlign : props.config.textAlign || 'center',
            buttons : props.config.buttons || null,
            opacity : props.config.opacity || .5,
            enabledMask : props.config.enabledMask
        }
        this.delayInter = null;
    }
    render(){
        //console.log('render');
        var show = this.props.show;
        if(show){
            return (
                <div className="nf-dialog-mask" style={{background:'rgba(0,0,0,'+this.state.opacity+')'}} onClick={this.close.bind(this)} onTouchMove={this.touch.bind(this)}>
                    <div className="nf-dialog">
                        <div className="nf-dialog-warp">
                            <DialogImg type={this.state.type} />
                            <DialogBody text={this.state.text} align={this.state.textAlign}/>
                            <DialogButton buttons={this.state.buttons} clickFn={this.fn.bind(this)}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }

    fn(flag){
        if(this.props.onHide && !flag){
            clearTimeout(this.delayInter); //关闭了上次的 timeout
            this.props.onHide();
        }
    }
    close(){
        //console.log('close',this.delayInter);
        if(!this.state.enabledMask){
            return ;
        }
        if(this.props.onHide){
            clearTimeout(this.delayInter); //关闭了上次的 timeout
            this.props.onHide();
        }
    }
    touch(e){
        e.preventDefault();
        return false;
    }
}
Dialog.defaultProps = {
    onHide : null
}

Dialog.propTypes = {
    config : React.PropTypes.object.isRequired, //dialog 的配置参数
    show : React.PropTypes.bool.isRequired,  //dialog 显示控制
    onHide : React.PropTypes.func //dialog 关闭函数
}
