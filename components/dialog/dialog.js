import React,{Component,propTypes} from 'react';

import './dialog.scss';

class DialogImg extends Component{
    render(){
        if(this.props.type){
            var type = 'nf-dialog-img nf-dialog-'+this.props.type
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
                <div className="nf-dialog-body">{this.props.text}</div>
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
                <div>
                    {
                        this.state.buttons.map(function(item,index){
                            return (
                                <button key={index} className={'btn btn-'+item.type} onClick={_this.btnClick.bind(_this,item.callback)}>{item.text}</button>
                            )
                        })
                    }
                </div>
            )
        }else{
            return null;
        }
    }
    btnClick(cb){
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
            buttons : props.config.buttons || null,
            opacity : props.config.opacity || .7
        }
    }
    render(){
        var show = this.props.show;

        if(show){
            return (
                <div className="nf-dialog-mask" style={{background:'rgba(0,0,0,'+this.state.opacity+')'}} onClick={this.close.bind(this)}>
                    <div className="nf-dialog">
                        <div className="nf-dialog-warp">
                            <DialogImg type={this.state.type} />
                            <DialogBody text={this.state.text} />
                            <DialogButton buttons={this.state.buttons} />
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
    close(){
        this.props.onHide();
    }
}
Dialog.propTypes = {
    config : React.PropTypes.object.isRequired
}
