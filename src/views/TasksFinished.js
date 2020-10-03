import React from 'react'
import { Button, Col, Layout, List, Row, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'

import { DeleteTask, TaskList } from '../redux/actions/taskActions'
import '../styles/tasks.css'
import Header from './Header'


const TasksFinished = () => {

	const { Content } = Layout
	const { Title } = Typography
	const dispatch = useDispatch()
	const { tasks } = useSelector(state => state.todo)

	const handleDelete = id => {

		dispatch( DeleteTask( id ) )
	}

	useEffect( () => {

		dispatch( TaskList() )
		
	}, [ dispatch ])

	return (
		<Layout>
			<Header />

			<Content className='content' >
				<Row justify='center' align='middle' >

					<Col xs={ 24 } sm={ 24 } md={ 12 }>
						<List
							className='list-container'
							header={ <Title level={ 2 } style={{ textAlign:'center' }} > Tareas Terminadas </Title> }
							size='large'
							dataSource={ tasks.filter( task => task.complete === true ) }
							renderItem={ item => (
								<List.Item>
									<List.Item.Meta 
										avatar={ 
											<Button
												icon={ <DeleteOutlined /> }
												danger
												onClick={ () => handleDelete( item.id ) }
											/>
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
		</Layout>
	)
}

export default TasksFinished
