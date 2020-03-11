import React from 'react';
import Button from '@material-ui/core/Button';

export default class TempreatureCalculator extends React.Component{
	constructor(props){
		super(props);
		this.state={
			temperature:'',
			scale:''
		}
	}
	_textField=(lable,inputName,value)=>{
		return(<div> <label>{lable}</label>
				<input name={inputName} value={value}   onChange={this._handelevents}/>
				<br/>
			</div>
		)
	}

	_handelevents=(e)=>{
		this.setState({scale:e.target.name,temperature:e.target.value})
	}

	toCelsius=()=>{
		const {temperature,scale}=this.state
		return scale==='celsius'?temperature:(temperature-32) * (5/9)
	}

	tofahrenheit=()=>{
		const {temperature,scale}=this.state
		return scale!='celsius'?temperature:(temperature* (9/5)) + 32
	}

	render () {
		const {temperature,scale}=this.state
		let c=this.toCelsius();
		let f=this.tofahrenheit();
		return(
			<div>
				{this._textField('Enter temperature in Celsius:','celsius',c)}
				{this._textField('Enter temperature in Fahrenheit:','fahrenheit',f)}
				<Button variant="contained" color="primary">
					Hello World
				</Button>
			</div>
		)
	}
}
