import React, { useState } from 'react'
import '../styles/login.css'
import {
	Button,
	Form,
	Input,
	Row,
	Grid,
	Typography
} from 'antd'
import {
	MailOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'

import { Login as LoginNode } from '../redux/actions/userActions'


const Login = () => {

	const { useBreakpoint } = Grid
	const { Title } = Typography
	const screen = useBreakpoint()
	const { isEmpty, isEmail } = validator
	const dispatch = useDispatch()
	const { loading, errorLogin } = useSelector( state => state.auth )

	//state
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ msgsError, setMsgsError ] = useState({})

	//styles
	const stylesForm = {
		boxShadow: screen.xs ? 'none' : '2px 2px 6px #ccc, -2px -2px 6px #ccc',
		backgroundColor: screen.xs ? 'transparent' : 'white'
	}
	const stylesContainer = {
		backgroundColor: screen.xs ? 'white' : '#f5f5f5'
	}

	const handleLogin = () => {
		
		if( isEmpty( email ) ) {

			return setMsgsError({ errEmail: 'El email es necesario' })
		}
		else if( !isEmail( email ) ) {

			return setMsgsError({ errEmail: 'El email no es valido' })
		}
		else if( isEmpty( password ) ) {

			return setMsgsError({ errPassword: 'La contraseña es necesaria' })
		}
		
		dispatch( LoginNode( email, password ) )
		
		setTimeout( () => {
			
			setEmail('')
			setPassword('')
		}, 700)
	}

	return (
		
		<Row 
			align='middle' 
			justify='center' 
			className='login-container'  
			style={ stylesContainer }
		>

			<Form 
				layout='vertical' 
				className='login-form' 
				style={ stylesForm } 
				onFinish={ handleLogin }
			>
				{
					errorLogin !== null && (
						<p className="msgErrorNode"> { errorLogin } </p>
					)
				}

				<Title
					level={ 3 } 
					type='secondary'
				>
					Iniciar Sesión
				</Title>
				
				<Form.Item label='Correo electronico: '>
					<Input 
						size='large'
						className='login-input'
						placeholder='ejemplo@ejemplo.com'
						prefix={ <MailOutlined /> }
						value={ email }
						onChange={ e => setEmail( e.target.value ) }
					/>
					{ msgsError.errEmail && <p className="msgError"> { msgsError.errEmail } </p> }
				</Form.Item>

				<Form.Item label='Contraseña: '>
					<Input.Password
						size='large'
						className='login-input'
						placeholder='password123'
						value={ password }
						onChange={ e => setPassword( e.target.value ) }
					/>
					{ msgsError.errPassword && <p className="msgError"> { msgsError.errPassword } </p> }
				</Form.Item>

				<Form.Item>
					<Button
						shape='round'
						block
						type='primary'
						size='large'
						htmlType='submit'
						loading={ loading }
					>
						Iniciar Sesión
					</Button>
				</Form.Item>

				<Form.Item>
					¿No tienes una cuenta? <Link to='/signup' >Registrate</Link> 
				</Form.Item>
			</Form>
		</Row>
		
	)
}

export default Login
