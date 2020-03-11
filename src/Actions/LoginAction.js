import React from 'react';
import {CHECKLOGIN,NEWUSER} from '../Constant'
import firebase from 'firebase'
import localStorage from 'local-storage'


export const CheckLogin= (data)=>{
	const db=firebase.firestore();
	return dispatch=>{
		db.collection("users")
			.where('password','==',data.password)
			.where('email','==',data.email)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					var data={id:doc.id,firstName:doc.data().firstName,lastName:doc.data().lastName,
						email:doc.data().email,password:doc.data().password}
					localStorage.set("data", data);
					dispatch({
						type:CHECKLOGIN,
						payload:data
					})
				});
				if(querySnapshot.size<1){
					//fail
					console.log("fail")
					dispatch({
						type:CHECKLOGIN,
						payload:null
					})
				}
			}).catch(e=>alert(e));
	}
}

export const NewUser=(data)=>{

	let date=new Date();

	const db=firebase.firestore();

	return dispatch=> {
		return db.collection("users").doc().set({
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			password: data.password,
		})
			.then(function () {
				console.log("Document successfully written!");
				dispatch({
					type: NEWUSER,
					payload: 'success'
				})
				return Promise.resolve("success")
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
				// return Promise.reject('fail')
				dispatch({
					type: NEWUSER,
					payload: 'fail'
				})
				return Promise.reject("Some Thing went worng while Signup. ")
			})

	}
}
