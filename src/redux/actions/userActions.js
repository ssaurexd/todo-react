import { types } from "../types/types"
import { fetchWithoutToken, fetchWithToken } from '../../hooks/fetch'


const LoginStart = () => {
	
	return {
		type: types.authLoginStart,
		payload: 'ok'
	}
}

const LoginSuccess = user => {

	return {
		type: types.authLoginSuccess,
		payload: user
	}
}

const LoginFail = error => {

	return {
		type: types.authLoginFail,
		payload: error
	}
}
const SignupStart = () => {
	
	return {
		type: types.authSignUpStart,
		payload: 'ok'
	}
}

const SignupSuccess = user => {

	return {
		type: types.authSignUpSuccess,
		payload: user
	}
}

const SignupFail = error => {

	return {
		type: types.authSignUpFail,
		payload: error
	}
}

const CheckingStart = () => {

	return {
		type: types.authCheckingStart
	}
}

const CheckingFinish = () => {

	return {
		type: types.authCheckingFinished
	}
}

const LogoutStart = () => {

	return {
		type: types.authLogout
	}
}

export const Logout = () => {

	return ( dispatch ) => {

		localStorage.clear()
		dispatch( LogoutStart() )
	}
}

export const Login = ( email, password ) => {

	return async( dispatch ) => {

		dispatch( LoginStart() )
			
		const resp = await fetchWithoutToken( 'user/signin', { email, password }, 'POST' )
		const data = await resp.json()

		if( data.ok ) {

			localStorage.setItem( 'token', data.token )
			localStorage.setItem( 'token-init-date', new Date().getTime() )
			dispatch( LoginSuccess({ 
				uid: data.uid,
				name: data.name
			}))
		}
		else {

			dispatch( LoginFail( data.msg ) )
		}
	}
}

export const Signup = ( name, email, password ) => {

	return async( dispatch ) => {

		dispatch( SignupStart() )
			
		const resp = await fetchWithoutToken( 'user/signup', { name, email, password }, 'POST' )
		const data = await resp.json()

		if( data.ok ) {

			localStorage.setItem( 'token', data.token )
			localStorage.setItem( 'token-init-date', new Date().getTime() )
			dispatch( SignupSuccess({ 
				uid: data.uid,
				name: data.name
			}))
		}
		else {

			dispatch( SignupFail( data.msg ) )
		}
	}
}

export const Checking = () => {

	return async( dispatch ) => {

		const resp = await fetchWithToken( 'user/revalidate-token' )
		const data = await resp.json()

		if( data.ok ) {

			localStorage.setItem( 'token', data.token )
			localStorage.setItem( 'token-init-date', new Date().getTime() )
			dispatch( LoginSuccess({ 
				uid: data.uid,
				name: data.name
			}))

			dispatch( CheckingStart() )
		}
		else {

			dispatch( CheckingFinish() )
		}
	}
}