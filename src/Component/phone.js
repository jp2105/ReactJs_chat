import React,{ReactDOM} from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
export default class Phone extends React.Component{
	constructor (props){
		super(props)
		this.state={
			phone_number: "",
			otp:''
		}
	}
	componentDidMount () {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "normal",
				callback: response => {
					this.setState({ isButtonDisabled: false });
				},
				"expired-callback": response => {
					// Response expired. Ask user to solve reCAPTCHA again.
					// ...
					this.setState({ isButtonDisabled: true });
					alert("Recaptcha Exprie Please try agian");
				}
			}
		);
		window.recaptchaVerifier.render().then(function(widgetId) {
			window.recaptchaWidgetId = widgetId;
		});
	}
	handleLogin = () => {
		var appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(this.state.phone_number, appVerifier)
			.then(confirmationResult => {
				this.setState({ sendOTP: true });
				window.confirmationResult = confirmationResult;
			})
			.catch(err => {
				console.log(err);
			});
	};
	handleOTPCheck = () => {
		window.confirmationResult
			.confirm(this.state.otp)
			.then(function(result) {
				// User signed in successfully.
				console.log(result);
				// ...
			})
			.catch(function(error) {
				// User couldn't sign in (bad verification code?)
				// ...
			});
	};
	handlePhoneChange = event => {
		this.setState({ phone_number: event.target.value });
	};
	handleOtpChange = event => {
		this.setState({ otp: event.target.value });
	};

	render () {
		return(<div style={{margin:10,}}>
				<TextField id="filled-search" label="Phone number" type="phone" value={this.state.phone_number}
									 onChange={this.handlePhoneChange} />

				<div id="recaptcha-container" style={{padding:10}}  />

			<Button onClick={this.handleLogin} variant="contained">SEND OTP</Button>
				<br/>
				<TextField id="filled-search" label="OTP" type="search" value={this.state.otp}
									 onChange={this.handleOtpChange} style={{padding:10}} />
				<Button onClick={this.handleOTPCheck} variant="contained">verify</Button>
			</div>
		)
	}
}
