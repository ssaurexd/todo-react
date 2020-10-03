import React from 'react'
import { NavLink } from 'react-router-dom'
import {
	Button,
	Drawer,
	Menu
} from 'antd'
import { UserOutlined, FileDoneOutlined , BarsOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'


const MobileMenu = ({ showMenu, setShowMenu, handleLogout }) => {

	const { name } = useSelector(state => state.auth)

	return (
		
		<Drawer 
			title='Todos'
			placement='bottom'
			closable={ false }
			onClose={ () => setShowMenu( false ) }
			key='bottom'
			visible= { showMenu }
			style={{ position: 'absolute' }}
			getContainer={ !showMenu }
		>
			<Menu 
				mode='inline'
			>
				<Menu.SubMenu
					title={
						<span>
							<UserOutlined />
							<span> { name } </span>
						</span>
					}
					key='sub1'
				>
					<Menu.Item key='profile'>
						<NavLink to='/profile'>Mi perfil</NavLink>
					</Menu.Item>

					<Menu.Item key='close'>
						<Button
							onClick={ () => handleLogout() }
						>
							<span style={{color:'red'}} >Cerrar sesión</span>
						</Button>
					</Menu.Item>
				</Menu.SubMenu>

				<Menu.Item key='tasks'>
					<BarsOutlined />
					<NavLink to='/tasks'>
						Mis tareas
					</NavLink>
				</Menu.Item>

				<Menu.Item key='tasks-finished'>
					<FileDoneOutlined  />
					<NavLink to='/tasks-finished'>
						Tareas terminadas
					</NavLink>
				</Menu.Item>
			</Menu>
		</Drawer>
	)
}

export default MobileMenu
