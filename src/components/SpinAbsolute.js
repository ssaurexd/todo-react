import React from 'react'
import { Spin } from 'antd'

import '../styles/spin-absolute.css'


const SpinAbsolute = () => {
	
	return (
		
		<div className='spin-absolute'>
			<Spin size='large' className='spin-spin'/>
		</div>
	)
}

export default SpinAbsolute
