import React from 'react'
import { Checkbox, Col, Layout, List, Row } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from 'antd'

import { CompleteTask, TaskList } from '../redux/actions/taskActions'
import FormAddTask from '../components/FormAddTask'
import '../styles/tasks.css'


const Tasks = () => {
	
	const { Content } = Layout
	const { Title } = Typography
	const dispatch = useDispatch()
	const { tasks } = useSelector(state => state.todo)

	const handleChecked = id => {

		dispatch( CompleteTask( id ) )
	}

	useEffect( () => {

		dispatch( TaskList() )
		
	}, [ dispatch ])

	return (
		
		<Content className='content' >
			<Row justify='center' align='middle' gutter={[ 0, 30 ]} >
				<Col xs={ 24 } sm={ 24 } md={ 11 } >
					<Title level={ 2 } style={{ textAlign:'center' }} > Agregar Tarea </Title>

					<FormAddTask />
				</Col>

				<Col xs={ 24 } sm={ 24 } md={ 13 }>
					<List
						className='list-container'
						header={ <Title level={ 2 } style={{ textAlign:'center' }} > Mis Tareas </Title> }
						size='large'
						dataSource={ tasks.filter( task => task.complete === false ) }
						renderItem={ item => (
							<List.Item>
								<List.Item.Meta 
									avatar={ 
										<Checkbox
											checked={ item.complete }
											onChange={ () => handleChecked( item.id ) }
										> 
											{ item.complete ? 'Terminada' : 'Sin terminar' } 
										</Checkbox> 
									}
									title={ item.title }
									description={ item.description }
								/>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</Content>
	)
}

export default Tasks
