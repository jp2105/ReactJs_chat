import firebase from 'firebase';
import { LOADCHATS } from '../Constant'
export const _loadChats=(currentUser, chatUser)=>{
	debugger
	const db=firebase.firestore();
	return dispatch => {
		return db.collection("chats")
			.onSnapshot((res) => {
				// console.log(res.docChanges())
				dispatch(_loadUserChange(currentUser,chatUser))
			});
	}
}

const _loadUserChange=(sender,reciver)=> {
	debugger
	const db = firebase.firestore();
	return (dispatch, getState )=> {
		return db.collection("chats").doc(`${sender.id}:${reciver.id}`)
			.get()
			.then((querySnapshot) => {
					if (!querySnapshot.data()) {
						dispatch(_loadUserChangeReverse(reciver, sender));
					} else {
						dispatch({
							type: LOADCHATS,
							payload: querySnapshot.data()
						})
					}
				}
			).catch(e => {
				alert(e)
			});
	}
}

const _loadUserChangeReverse=(sender,reciver)=>{
	debugger
	const db=firebase.firestore();
	return dispatch => {
		return db.collection("chats").doc(`${sender.id}:${reciver.id}`)
			.get()
			.then((querySnapshot) => {
					dispatch({
						type: LOADCHATS,
						payload: querySnapshot.data()
					})
				}
			).catch(e => alert(e));
	}
}

export const _sendMsgAction= async (sender,reciver,msg)=>{
	debugger
		await _isNewChat(sender.id,reciver.id).then( res=>{
			_sendNewMsg(sender,reciver,msg,sender.email)
		}).catch(res=>{
			_isNewChat(reciver.id,sender.id).then(res=>{
				_sendNewMsg(reciver,sender,msg,sender.email)
			}).catch(res=>{
				_newChatwithMsg(sender,reciver,msg)
			})
		})
	return Promise.resolve("abc")
}

const _isNewChat = async (sender,reciver)=>{
	const db=firebase.firestore();
	var temp=null;
	await db.collection("chats").doc(`${sender}:${reciver}`)
			.get()
			.then((querySnapshot) => {
				temp=querySnapshot.data();
				}
			).catch(e => {
				 alert("some thing went wrong while sending message")
			 }
		 );
	if(temp){
		return Promise.resolve(true)
	}else {
		return Promise.reject(false)
	}

}

const _sendNewMsg=(sender,reciver,msg,senderEmail)=>{
	debugger
	const db=firebase.firestore();
	var temp={msg:msg,sender:senderEmail,time:new Date()}
	db.collection("chats").doc(`${sender.id}:${reciver.id}`).update( {
		allMsg: firebase.firestore.FieldValue.arrayUnion( temp )
	}).then(res=>{
		// console.log(res)
	}).catch(e=>{
			console.log(e)});
}

const _newChatwithMsg=(sender,reciver,msg)=>{
	debugger
	const db=firebase.firestore();
	var temp={msg:msg,sender:sender.email,time:new Date()}
	 db.collection("chats").doc(`${sender.id}:${reciver.id}`).set({
		allMsg:[temp]
	}).then(res=>{
		// console.log(res)
	}).catch(e=>console.log(e))
}
