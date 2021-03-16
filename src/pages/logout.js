import React from 'react';

import {Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
class logout extends React.Component{
    constructor(){
        super()
        this.state = {
            redirect: false
        }
    }
    componentDidMount(){
       
    }
    render(){
        if(this.state.redirect === true){
            return <Redirect to="/"/>
        }
        return(
            <div style={{textAlign:"center",position:"absolute",top:"25%",left:"50%"}}>
				<h3>loading</h3>
				<Spinner/>
			</div>
        )
    }
}