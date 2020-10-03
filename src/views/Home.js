import { Layout } from 'antd'
import React from 'react'

import Header from './Header'
import Tasks from './Tasks'


const Home = () => {
	
	return (
		<Layout>
			<Header />
			
			<Tasks />
		</Layout>
	)
}

export default Home
