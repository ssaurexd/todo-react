import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Switch,
	Route, 
	Redirect
} from 'react-router-dom'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../views/Home'
import NoFound from '../views/NoFound'
import { Checking } from '../redux/actions/userActions'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import SpinAbsolute from '../components/SpinAbsolute'
import NewTask from '../views/TasksFinished'
import Profile from '../views/Profile'


const AppRouter = () => {

	const dispatch = useDispatch()
	const { checking, uid } = useSelector( state => state.auth )	

	useEffect( () => {

		dispatch( Checking() )
	}, [ dispatch ])

	if( checking ) {

		return (
			<SpinAbsolute />
		)
	}

	return (
	
		<Router>
			<div>
				<Switch>
					<PrivateRoutes 
						path= '/'
						exact
						component= { Home }
						isAuthenticated={ !!uid }
					/>

					<PrivateRoutes 
						path= '/tasks'
						exact
						component= { Home }
						isAuthenticated={ !!uid }
					/>
					
					<PrivateRoutes 
						path= '/tasks-finished'
						exact
						component= { NewTask }
						isAuthenticated={ !!uid }
					/>
					
					<PrivateRoutes 
						path= '/profile'
						exact
						component= { Profile }
						isAuthenticated={ !!uid }
					/>

					<PublicRoutes 
						path= '/login'
						exact
						component= { Login }
						isAuthenticated={ !!uid }
					/>
					
					<PublicRoutes
						path= '/signup'
						exact
						component= { Signup }
						isAuthenticated={ !!uid }
					/>

					<Route 
						path= '/nofound'
						exact
						component= { NoFound }
					/>

					<Redirect 
						to= '/nofound'
					/>
				</Switch>
			</div>
		</Router>
	)
}

export default AppRouter
