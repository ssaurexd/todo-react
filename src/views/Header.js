import React from 'react'
import { Layout } from 'antd'
import Navbar from '../components/Navbar'


const Header = () => {
	
	const { Header } = Layout

	return (
		
		<Header>
			<Navbar />
		</Header>
	)
}

export default Header
