// region import

import cook from 'cookie'

// endregion

// region verify

export const verify = api => async ({cookie}) => {
	const {token} = cook.parse(cookie || '')
	try {
		const result = await api.account.verify(token)
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

// region signIn

export const signIn = api => async ({origin}, body) => {
	try {
		const {name, password} = JSON.parse(body)
		try {
			const result = await api.account.signIn({name, password})
			return {
				status: 200,
				body: '',
				headers: {
					'Set-Cookie': cook.serialize('token', result, {
						domain: origin.split('//')[1],
						maxAge: 86400,
						httpOnly: true,
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
