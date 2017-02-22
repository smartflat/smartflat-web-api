// region import

import cook from 'cookie'

// endregion

// region verify

export const verify = api => async ({cookie}) => {
	const {token} = cook.parse(cookie || '')
	try {
		const result = await api.session.verify(token)
		return {
			status: 200,
			body: JSON.stringify(result, null, '\t'),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
	} catch (error) {
		return {
			status: 401,
			body: JSON.stringify({
				message: 'Unauthorized'
			}),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
	}
}

// endregion

// region sign-in

export const signIn = api => async ({origin}, body) => {
	try {
		const {name, password} = JSON.parse(body)
		try {
			const result = await api.session.create({name, password})
			return {
				status: 200,
				body: '',
				headers: {
					'Set-Cookie': cook.serialize('token', result, {
						domain: origin.split('//')[1],
						httpOnly: true,
						maxAge: 86400,
						path: '/',
						secure: true
					})
				}
			}
		} catch (error) {
			return {
				status: 401,
				body: JSON.stringify({
					message: 'Unauthorized'
				}, null, '\t'),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}
		}
	} catch (error) {
		return {
			status: 400,
			body: JSON.stringify({
				message: 'Bad JSON'
			}, null, '\t'),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
	}
}

// endregion

// region sign-out

export const remove = api => ({origin}) => ({
	status: 200,
	body: JSON.stringify({
		message: 'Success'
	}, null, '\t'),
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Set-Cookie': cook.serialize('token', '', {
			domain: origin.split('//')[1],
			httpOnly: true,
			maxAge: 0,
			path: '/',
			secure: true
		})
	}
})

// endregion
