import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import {NewUser} from '../Actions/LoginAction'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useHistory
} from "react-router-dom";
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp(props) {
	const classes = useStyles();
	const [data,setData]=useState(null);
	const db=firebase.firestore();
	const dispatch=useDispatch();
	const history=useHistory()
	const status= useSelector(state=>state.LoginReducers.status)
	console.log(status)

	const _handlerInputs=(e)=>{
		setData({
			...data,
			[e.name]:e.value
		})
	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					{/*<LockOutlinedIcon />*/}
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{/*<form  className={classes.form}   action={'#'} noValidate>*/}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={(e)=>_handlerInputs(e.target)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={(e)=>_handlerInputs(e.target)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e)=>_handlerInputs(e.target)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e)=>_handlerInputs(e.target)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={()=>{

							dispatch(NewUser(data)).then((res)=>{

								history.push('/login')
							})
						}}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link toto="/Login">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				{/*</form>*/}
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
