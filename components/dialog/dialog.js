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
        return (
            <div className="nf-dialog-mask" style={{display:show?'block':'none',background:'rgba(0,0,0,'+this.state.opacity+')'}} onClick={this.close.bind(this)}>
                <div className="nf-dialog">
                    <div className="nf-dialog-warp">
                        <DialogImg type={this.state.type} />
                        <DialogBody text={this.state.text} />
                    </div>
                </div>
            </div>
        )
    }
    close(){
        this.props.onHide();
    }
}
Dialog.propTypes = {
    config : React.PropTypes.object.isRequired
}
