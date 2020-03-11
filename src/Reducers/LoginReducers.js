import React from 'react';
import {CHECKLOGIN,NEWUSER} from '../Constant'

const userData={
	user:null,
	status:'fail'
}

export const LoginReducers = (state=userData,action) =>{
	switch (action.type) {
		case CHECKLOGIN:
			return {
				...userData,
				user:action.payload
			}
		case NEWUSER:
			return {
				...userData,
				status:action.payload
			}
	}
	return state
}
