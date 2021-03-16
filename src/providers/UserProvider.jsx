import {createContext, React, Component} from "react";
import auth from "../base";

export const UserContext = React.createContext({user: null});

class UserProvider extends Component{
	state={ user: null};

	componentDidMount = async () => {
		auth.onAuthStateChanged(async userAuth =>{
			const user = await generateUserDocument(userAuth);
			this.setState({user});
		});
	};

	render() {
		return(
			<UserContext.Provider value={this.state.user}>
				{this.props.children}
			</UserContext.Provider>
		);

}


export default UserProvider;
