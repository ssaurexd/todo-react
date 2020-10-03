import React from 'react'
import 'antd/dist/antd.css'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import './styles/app.css'


const App = () => {
	
	return (
		<Provider store={ store } >
			<AppRouter />
		</Provider>
	)
}

export default App
