import React from 'react';
import Header from '../Common/Header'
import Body from '../Common/Body'
import localStorage from 'local-storage'

class  DesignDemo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			header:'header',
			body:'body'
		}
	}
	componentDidMount () {
		let cnt=0;
		setInterval(()=>{
			cnt++;
			this.setState({
				body:`Body ${cnt}`
			})
		},1000);
	}

	render () {
		// console.log(localStorage.get("data"));
		return (
			<div>
				<Header cnt={this.state.header}/>
<Body cnt={this.state.body}/>
			</div>
		)
	}
}

export default DesignDemo;
