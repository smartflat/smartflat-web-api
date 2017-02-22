// region import

import fs from 'fs'

// endregion

// region routes

export default ({api, config}) => ({
	name: 'web-api',
	routes: [
		['get', 'account', [], {
			status: 200,
			body: api.foo,
			headers: {
				'Content-Type': 'text/plain; charset-utf-8'
			}
		}]
	]
})

// endregion
