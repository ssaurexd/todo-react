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
	MailOutlined,
	UserOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { Signup as SignupNode } from '../redux/actions/userActions'


const Signup = () => {
	
	const { useBreakpoint } = Grid
	const { Title } = Typography
	const screen = useBreakpoint()

	//state
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ name, setName ] = useState('')
	const [ msgsError, setMsgsError ] = useState({})
	const { isEmpty, isEmail } = validator
	const dispatch = useDispatch()
	const { loading, errorSignup } = useSelector( state => state.auth )

	//styles
	const stylesForm = {
		boxShadow: screen.xs ? 'none' : '2px 2px 6px #ccc, -2px -2px 6px #ccc',
		backgroundColor: screen.xs ? 'transparent' : 'white'
	}
	const stylesContainer = {
		backgroundColor: screen.xs ? 'white' : '#f5f5f5'
	}

	const handleSignup = () => {
		
		if ( isEmpty( name ) ) {

			return setMsgsError({ errName: 'El nombre es necesario' })
		}
		else if( isEmpty( email ) ) {

			return setMsgsError({ errEmail: 'El email es necesario' })
		}
		else if( !isEmail( email ) ) {

			return setMsgsError({ errEmail: 'El email no es valido' })
		}
		else if( isEmpty( password ) ) {

			return setMsgsError({ errPassword: 'La contraseña es necesaria' })
		}
		
		dispatch( SignupNode( name, email, password ) )
		setName('')
		setEmail('')
		setPassword('')
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
				onFinish={ handleSignup }
			>
				{
					errorSignup !== null && (
						<p className="msgErrorNode"> { errorSignup } </p>
					)
				}

				<Title
					level={ 3 }
					type='secondary'
				>
					Registrarse
				</Title>

				<Form.Item label='Nombre: '>
					<Input 
						size='large'
						className='login-input'
						placeholder='ejemplo'
						prefix={ <UserOutlined /> }
						value={ name }
						onChange={ e => setName( e.target.value ) }
					/>
					{ msgsError.errName && <p className="msgError"> { msgsError.errName } </p> }
				</Form.Item>

				<Form.Item label='Correo electronico: '>
					<Input 
						size='large'
						className='login-input'
						placeholder='ejemplo@ejemplo.com'
						prefix={ <MailOutlined /> }
						value={ email}
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
						Registrarse
					</Button>
				</Form.Item>

				<Form.Item>
					¿Ya tienes una cuenta? <Link to='/login' >Inicia sesión</Link> 
				</Form.Item>
			</Form>
		</Row>
	)
}

export default Signup
