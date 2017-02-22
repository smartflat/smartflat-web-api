// region import

import fs from 'fs'

// internal

import * as session from './session'

// endregion

// region routes

export default ({api, config}) => ({
	name: 'web-api',
	routes: [
		['get', 'v1/session', ['headers'], session.verify(api)],
		['post', 'v1/session', ['headers', 'body'], session.signIn(api)],
		['delete', 'v1/session', ['headers'], session.remove(api)]
	]
})

// endregion
