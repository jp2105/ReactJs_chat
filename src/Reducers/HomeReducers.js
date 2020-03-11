import React from 'react';
import {FILLUSERS,LOADCHATS,LOGOUT} from '../Constant'

const HomeState={
	chats:null
}

export const HomeReducers = (state= HomeState, action) =>{

	const {type, payload} = action;
	switch (type) {

		case LOADCHATS:
			return {
				...HomeState,
				chats: action.payload
			}

		default :
			return state
	}
}
