import { types } from '../types/types'


const initialState = {
	loading: false,
	error: null,
	tasks: []
}

export const taskReducer = ( state = initialState, action ) => {

	switch ( action.type ) {

		case types.taskListStart:
			
			return {
				...state,
				loading: true
			}
	
		case types.taskListSuccess:
			
			return {
				...state,
				loading: false,
				error: null,
				tasks: action.payload
			}
		
		case types.taskListFail:
			
			return {
				...state,
				loading: false,
				error: action.payload
			}
	
		default:
			
			return state
	}
}