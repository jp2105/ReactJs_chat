import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from "react-router-dom";
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));
const Header=(props)=>{
		return (
			<div className={useStyles.root}>
				<AppBar position="static">
					<Toolbar variant="dense" className={useStyles.menuButton}>
						<Typography variant="h6" color="inherit">
							Header
						</Typography>
					</Toolbar>
					<Link to="/">Home</Link>
					<Link to="/Signup">Signup</Link>
					<Link to="/Login">Login</Link>
					<Link to="/TempreatureCalculator">TempreatureCalculator</Link>
					<Link to="/FetchData">FetchData</Link>
				</AppBar>
			</div>
		)
}

export default React.memo(Header);
