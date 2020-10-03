const baseUrl = 'https://todo-node-ssaurexd.herokuapp.com'


export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

	const url = `${ baseUrl }/${ endpoint }`
	const token = localStorage.getItem( 'token' ) || ''

	if( method === 'GET' ) {

		return fetch( url,{
			method,
			headers: {
				'Content-type': 'application/json',
				'x-token': token
			}
		})
	}

	return fetch( url, {
		method,
		headers: {
			'Content-type': 'application/json',
			'x-token': token
		},
		body: JSON.stringify( data )
	})
}

export const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

	const url = `${ baseUrl }/${ endpoint }`

	if( method === 'GET' ) {

		return fetch( url )
	}

	return fetch( url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify( data )
	})
}