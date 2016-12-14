import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import SimpleComponent from '../components/test/test.js';

var config = {
    title : 'Hello React',
    content : 'This is a React Component',
    customStyle : {
        'padding': '10px',
        'border' : '1px solid #dadada',
        'margin' : '10px',
        'borderRadius' : '5px'
    }
}

const App = (props)=>{
    console.log(props);
    return(
        <SimpleComponent {...config}/>
    )
}
console.log(React);
ReactDOM.render(<App name="blue"/>,document.getElementById('app'));
