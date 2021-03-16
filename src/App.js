import React from 'react';
import TopBar from './components/TopBar';
import {Grid} from '@material-ui/core';
//The pages that are linked to
import Decider from './pages/Decision';
import PerformanceHome from './pages/PerformanceHome';
import Technique from './pages/Technique';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
//import PitchDetector from './components/PitchDetector'
import SingBacks from './pages/SingBacks'
import Harmonizations from './pages/Harmonizations'
import Lesson from './pages/Lesson';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//React-DOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//backend



class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			authenticated: false
		};
		
	}
	componentDidMount(){
		//this.setState({buttonState: false, userMode: 'Choose'})
	}

	componentWillUnmount(){
		this.removeAuthListener();
	}

	render(){
	  return (
	  //Container utilized bootstrap to make things a bit more responsive
	<>
		<Router fluid>
	    <Grid container spacing={0}>
			<Grid item className="sticky-nav"  xs={12}>
				<TopBar fluid  authenticated={this.state.authenticated} />
			</Grid>
			<Grid item xs={12}>
				<Switch>
					<Route path='/home' render={() => <Decider  />} />
					<Route path='/Technique' render={(props) => <Technique {...props} buttonState={this.state.buttonState} userMode={this.state.userMode} />} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/Performance' component={PerformanceHome} />
					<Route path='/profile' component={Profile} />
					<Route path='/modules/1' render={(props) => <Lesson {...props} buttonState={this.state.buttonState} lessonType={3} userMode={this.state.userMode}/>} />
					<Route path='/modules/2' render={(props) => <Lesson {...props} buttonState={this.state.buttonState} lessonType={2} userMode={this.state.userMode}/>} />
					<Route path='/modules/3' render={(props) => <Lesson {...props} buttonState={this.state.buttonState} lessonType={1} userMode={this.state.userMode} />} />
					<Route path='/modules/4' render={(props) => <SingBacks {...props} buttonState={this.state.buttonState}  userMode={this.state.userMode} />} />
					<Route path='/modules/5' render={(props) => <Harmonizations {...props} buttonState={this.state.buttonState}  userMode={this.state.userMode} />} />
					{/* Default page is Pathways page, any page that isnt referenced above gets routed here */}
					<Route path='/' render={(props) => <Decider {...props} userMode={this.state.userMode} onDecided={this.modeDecided} />} />
					{
						// This is a temporary defaultpage, we should raise an issue on this
					}

				</Switch>
			</Grid>
		</Grid>
	</Router>
	</>
	  );
}}

export default App;
