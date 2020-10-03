import React, { useState } from 'react'
import { 
	Col, 
	Menu, 
	Row, 
	Button
} from 'antd'
import { 
	UserOutlined, 
	FileDoneOutlined,
	BarsOutlined,
	MenuOutlined
} from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MobileMenu from './MobileMenu'
import { Logout } from '../redux/actions/userActions'
import '../styles/nav.css'


const Navbar = () => {

	const [ showMenu, setShowMenu ] = useState( false )
	const { name } = useSelector( state => state.auth )
	const dispatch = useDispatch()

	const handleLogout = () => {

		dispatch( Logout() )
	}

	return (
		
		<nav>
			{
				showMenu && (
					<MobileMenu 
						showMenu={ showMenu } 
						setShowMenu={ setShowMenu }
						handleLogout={ handleLogout }
					/>
				)
			}

			<Row > 
				<Col xs={ 0 } sm={ 24 } md={ 24 } >
					<Row  >
						<Col span={ 4 }>
							<span style={{ color: 'white', fontSize:'1.5em' }} >Todos</span>
						</Col>

						<Col span={ 20 }>
							<Row justify='end' >
								<Menu 
									mode='horizontal' 
									theme='dark'
								>
									<Menu.Item key='tasks'>
										<BarsOutlined />
										<NavLink to='/tasks' activeClassName='active'>
											Mis tareas
										</NavLink>
									</Menu.Item>

									<Menu.Item key='tasks-finished'>
										<FileDoneOutlined />
										<NavLink to='/tasks-finished' activeClassName='active'>
											Tareas terminadas
										</NavLink>
									</Menu.Item>

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
											<Link
												onClick={ handleLogout }
												to=''
											>
												Cerrar sesión
											</Link>
										</Menu.Item>
									</Menu.SubMenu>
								</Menu>
							</Row>
						</Col>
					</Row>
				</Col>

				<Col xs={ 24 } sm={ 0 } md={ 0 } >
					<Row style={{position:'sticky'}} >
						<Col xs={ 4 }>
							<span style={{ color: 'white', fontSize:'1.5em' }} >Todos</span>
						</Col>

						<Col push={ 20 } >
							<Button 
								icon={ <MenuOutlined style={{color:'white' }} /> }
								type='ghost'
								onClick={ () => setShowMenu( !showMenu ) }
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</nav>
	)
}

export default Navbar
