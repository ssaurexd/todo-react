import { types } from "../types/types"
import { fetchWithToken } from '../../hooks/fetch'
import { message } from 'antd'


const TaskStart = () => {

	return {
		type: types.taskListStart
	}
}

const TaskSuccess = tasks => {

	return {
		type: types.taskListSuccess,
		payload: tasks
	}
}

const TaskFail = error => {

	return {
		type: types.taskListFail,
		payload: error
	}
}

export const TaskList = () => {

	return async( dispatch ) => {

		dispatch( TaskStart() )
		
		const resp = await fetchWithToken( 'todo/list' )
		const data = await resp.json()

		if( data.ok ) {

			dispatch( TaskSuccess( data.todos ) )
		}
		else {

			dispatch( TaskFail( data.msg ) )
		}
	}
}

export const CompleteTask = ( id ) => {

	return async ( dispatch ) => {

		const resp = await fetchWithToken( `todo/complete/${ id }`, { complete: true }, 'PUT' )
		const data = await resp.json()

		if( data.ok ) {

			message.success( 'Tarea completada', 2 )
			dispatch( TaskList() )
		}
		else {
			
			message.error( 'No se pudo completar la tarea', 2 )
		}
	}
}

export const AddTask = ( title, description ) => {

	return async( dispatch ) => {
		
		const resp = await fetchWithToken( 'todo/new-todo', { title, description }, 'POST' )
		const data = await resp.json()

		if( data.ok ) {

			message.success( 'Tarea agregada', 2 )
			dispatch( TaskList() )
		}
		else {

			message.error( data.msg, 2 )
		}
	}
}

export const DeleteTask = ( id ) => {

	return async( dispatch ) => {

		const resp = await fetchWithToken( `todo/delete/${ id }`, { } , 'DELETE' )
		const data = await resp.json()

		if( data.ok ) {

			message.success( 'Tarea eliminada', 2 )
			dispatch( TaskList() )
		}
		else {

			message.error( data.msg, 2 )
			console.log( data )
		}
	}
}