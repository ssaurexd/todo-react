import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import validator from 'validator'

import { AddTask } from '../redux/actions/taskActions'



const FormAddTask = () => {

	const { isEmpty } = validator
	const [ title, setTitle ] = useState('')
	const [ description, setDescription ] = useState('')
	const [msgsError, setMsgsError] = useState({})
	const dispatch = useDispatch()

	const handleAddTask = () => {

		if ( isEmpty( title ) ) {

			return setMsgsError({ errTitle: 'El titulo es necesario.' })
		}
		else if( isEmpty( description ) ) {

			return setMsgsError({ errDescription: 'La descripción es necesaria' })
		}

		dispatch( AddTask( title, description ) )
		setTitle('')
		setDescription('')
	}

	return (
		
		<Form
			onFinish={ handleAddTask }
			className='form-addtask'
			layout='vertical'
		>
			<Form.Item
				label='Titulo: '
			>
				<Input 
					placeholder='Titulo'
					size='large'
					value={ title }
					onChange={ e => setTitle( e.target.value ) }
				/>
				{ msgsError.errTitle && <p className="msgError"> { msgsError.errTitle } </p> }
			</Form.Item>

			<Form.Item
				label='Descripción: '
			>
				<Input.TextArea 
					placeholder='Descripción'
					size='large'
					value={ description }
					onChange={ e => setDescription( e.target.value ) }
				/>
				{ msgsError.errDescription && <p className="msgError"> { msgsError.errDescription } </p> }
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					block
					htmlType='submit'
				>
					Agregar Tarea
				</Button>
			</Form.Item>
		</Form>
	)
}

export default FormAddTask
