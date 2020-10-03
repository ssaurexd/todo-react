import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//
import { userReducer } from '../reducers/userReducer'
import { taskReducer } from '../reducers/taskReducer'


const reducers = combineReducers({
	//mis reducers
	auth: userReducer,
	todo: taskReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware( thunk )
	)
)