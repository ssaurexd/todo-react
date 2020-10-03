import { types } from '../types/types'
import { message } from 'antd'


const initialState = {
	checking: true,
	uid: null,
	name: null,
	loading: false,
	errorLogin: null,
	errorSignup: null
}

export const userReducer = ( state = initialState, action ) => {

	switch ( action.type ) {
		
		case types.authCheckingFinished:

			return {
				...state,
				checking: false
			}	
		
		case types.authCheckingStart:

			return {
				...state,
				checking: false
			}	
	
		case types.authLoginStart:

			return {
				...state,
				loading: true
			}	

		case types.authLoginSuccess:

			return {
				...state,
				loading: false,
				errorLogin: null,
				...action.payload
			}

		case types.authLoginFail:

			return {
				...state,
				loading: false,
				errorLogin: action.payload
			}
		
		case types.authLogout:

			return {
				checking: false
			}

		case types.authSignUpStart:

			return {
				...state,
				loading: true
			}	

		case types.authSignUpSuccess:

			message.success( 'Usuario registrado con exito', 3 )

			return {
				...state,
				loading: false,
				errorSignup: null,
				...action.payload
			}

		case types.authSignUpFail:

			return {
				...state,
				loading: false,
				errorSignup: action.payload
			}

		default:
			return state
	}
}