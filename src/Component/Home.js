import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import localStorage from 'local-storage'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SendRounded from '@material-ui/icons/SendRounded';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SplitPane from 'react-split-pane'
import firebase from 'firebase';
import bg from '../Assets/img/bg.jpg';
import MoreIcon from '@material-ui/icons/MoreVert';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Link, } from "react-router-dom";
import {_loadChats,_sendMsgAction} from "../Actions/HomeAction"
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
class Home extends React.Component {

	constructor(props){
		super(props)

		this.db=firebase.firestore();

		this.state={
			currentUser:localStorage.get("data"),
			allUsers:[],
			isLoadingAllUsers:true,
			isLoadingChats:true,
			anchorEl:null,
			chatUser:null,
		}
		this.sendMsg=''

	}

	componentDidMount () {
		this._fillUsers();
	}

	handleMenuClick = event => {
		this.setState({anchorEl:event.currentTarget});
	};

	_chatUserClick=(temp)=>{
		this.setState({chatUser:temp},()=>this.props._loadChats(this.state.currentUser,this.state.chatUser))
	}

	handleMenuClose = () => {
		this.setState({anchorEl:null});
	};

	_fillUsers=()=>{
		const {currentUser,allUsers}=this.state
		var temp=[];
		this.db.collection("users")
			.get()
			.then((querySnapshot)=> {
					querySnapshot.forEach((doc) =>{
							var data={id:doc.id,firstName:doc.data().firstName,lastName:doc.data().lastName,
								email:doc.data().email,password:doc.data().password}

							if(data.id!= currentUser.id){
								temp.push(data)
							}
						}
					);
					if(querySnapshot.size<1){
						//fail
						console.log("fail")
					}
					this.setState({allUsers:temp,isLoadingAllUsers:false,chatUser:temp[0]},()=>this.props._loadChats(this.state.currentUser,this.state.chatUser))
				}

			).catch(e=>alert(e));
	}

	_logout=()=>{
		localStorage.set("data",null)
		this.props.history.push('/login')
	}

	_loadSingleChat=()=>{
		const { classes,chats } = this.props;
		if(chats && chats.allMsg.length>0 ) {
			return chats.allMsg.map((item, index) => {
				if (item.sender === this.state.currentUser.email) {
					return <div className={classes.chatRight}>
						<Chip
							style={{backgroundColor:"#3498DB",color:"white",fontSize:15,}}
						label={item.msg}
					/></div>
				} else {
					return (
						<Chip
							style={{backgroundColor:"#3498DB",color:"white",fontSize:15,marginLeft: 10}}
							avatar={<Avatar style={{color:"#3498DB",backgroundColor:"white",fontWeight:"900"}} alt={item.sender} src="/static/images/avatar/1.jpg" />}
							label={item.msg}
						/>
					)
				}

			})
		}
	}
	_sendMsg=()=>{
		const {currentUser,chatUser}=this.state
_sendMsgAction(currentUser,chatUser,this.sendMsg).then(res=>{
	console.log(res)
})
	}

	render () {
		const {currentUser,allUsers,isLoadingAllUsers,anchorEl,chatUser}=this.state
		const { classes,chats } = this.props;
		if (!localStorage.get("data")) {
			this.props.history.push('/')
		}
		return (
			<div className={classes.root}>
				<Backdrop className={classes.backdrop} open={isLoadingAllUsers} >
					<CircularProgress color="inherit" />
				</Backdrop>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={this.handleMenuClose}
				>
					<MenuItem onClick={this._logout}>Logout</MenuItem>
				</Menu>
				<SplitPane  split="vertical"  defaultSize={300} >

					<div  style={{width:300,height:"100%",border:1,overflow: "auto"}} >

						<AppBar style={{backgroundColor:"#3498DB"}} position="static">
							<Toolbar>
								<ListItemAvatar>
									<Avatar style={{backgroundColor:"white",color:"#3498DB",fontWeight:"bold"}} alt={currentUser.email} src="/static/images/avatar/1.jpg" />
								</ListItemAvatar>
								<Typography variant="h1" style={{fontWeight:"800",fontSize:30}} className={classes.title}>
									{currentUser.email}
								</Typography>
								<IconButton onClick={this.handleMenuClick} style={{position:'absolute',right:0}} color="inherit">
									<MoreIcon />
								</IconButton>
							</Toolbar>
						</AppBar>

						<List className={classes.listRoot}>
							{allUsers && allUsers.length > 0 && allUsers.map((item,index) => {
								return(
									<>
										<ListItem alignItems="flex-start" style={{alignItems:'center',justifyContent:'center'}} onClick={()=>this._chatUserClick(item)}>
											<ListItemAvatar>
												<Avatar alt={item.email} className={classes.purple} src="/static/images/avatar/1.jpg" />
											</ListItemAvatar>
											<ListItemText
												primary={item.email}
											/>
										</ListItem>
										<Divider  />
									</>
								)
							})}
						</List>
					</div>
{/*************************chat side***********************/}
					<div className={classes.image}>
						<Box borderLeft={2} style={{color:"white"}} >
						<Grid container className={classes.headerDiv}>

							<Grid item className={classes.header}>
								{ <Avatar style={{backgroundColor:"white",color:"#3498DB",fontWeight:"bold"}} alt={chatUser && chatUser.email} src="/static/images/avatar/1.jpg" />}
							</Grid>

							<Grid item className={classes.header}>
								{chatUser &&  `${chatUser.firstName} ${chatUser.lastName}`}
							</Grid>

						</Grid>
						</Box>
						<div className={classes.chatMainDiv}>
							{/*<div className={classes.chatRight}>Right</div>*/}
							{this._loadSingleChat()}
							{!chats && <div style={{textAlign:"center",marginTop:20}}>
								<Chip
									style={{backgroundColor:"#239B56",color:"white",fontSize:20,}}
									label={"Start your chat now."}
								/>
							</div>}
						</div>
						<Grid className={classes.sendInputTextDiv} container  >

							<Grid item  className={classes.textFieldGrid}>
								<TextField
									id="outlined-multiline-static"
									multiline
									rows="1"
									variant="outlined"
									className={classes.sendInputText}
									onChange={(v)=>this.sendMsg=v.target.value}
								/>
							</Grid>

							<Grid item >
								<SendRounded onClick={()=>this._sendMsg()} className={classes.sendIcon}/>
							</Grid>

						</Grid>
					</div>

				</SplitPane>

			</div>
		);
	}
}

const styles=theme => ({
	root:{
		height:"100%",
		width:'100%'
	},
	header:{
		paddingTop: 13,
		color:'white',
		fontSize:30,
		paddingLeft:10,
		// backgroundColor:"red"
	},
	userTitel:{
		fontSize:20,
		fontWeight:"600",
		alignSelf:'center'
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500]
	},
	spiltRoot: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		fontSize:20
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	listRoot: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
	image: {
		backgroundImage: `url(${bg})` ,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: "100%",
		width:"100%"
	},
	sendInputText:{
		width:'100%',
		borderRadius:20,
		fontSize:"large"
	},
	sendInputTextDiv:{
		position:'absolute',
		bottom:10,
		alignItems: "center",
		justifyContent: "center",
		padding:10
	},
	textFieldGrid:{
		width:"96%"
	},
	sendIcon:{
		fontSize: "300%"
	},
	headerDiv:{
		width:"100%",
		backgroundColor:'#3498DB',
		height:"64px",
	},
	chatMainDiv:{
		height:"80%",
		// backgroundColor:'red',
		overflow: "auto"
	},
	chatRight:{
		height:30,
		textAlign: "right",
		// backgroundColor:"green",
		padding: 10,
		marginRight: 10
	},
	chatLeft:{
		marginLeft: 10
	},
	smallAvater: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},


});

const mapStatetoProps=(state)=>{
	return{
	chats:state.HomeReducers.chats

	}
}

export default withStyles(styles) (connect(mapStatetoProps,{_loadChats})(Home))
