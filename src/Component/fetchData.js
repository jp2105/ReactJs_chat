import React from 'react'
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
export default class FetchData extends React.Component{
constructor (props){
	super(props)
	this.state={
		isLoading:true,
		data:null
	}
}
componentDidMount () {
	this._fetchData();
}

_fillData=()=>{

}

_fetchData=()=>{
	axios.get('https://jsonplaceholder.typicode.com/todos/').then(res=>{
	this.setState({isLoading:false,data:res.data},()=>{})}
	).catch(err=>console.log(err))
}
	render () {
		return(
			this.state.isLoading?
				<div style={{height:'auto',}}>
					<div style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					height:'auto',
				}}>
					<CircularProgress/>
				</div>

				</div>
				:<div>
					{this.state.data && this.state.data.map((item,index)=>{
					return(
						<div>{`${item.id} ${item.title}`}</div>
					)
				})}
				</div>
		)
	}
}
