# SmartFlat Web API

This module exposes a RESTful JSON API on `your.smartfl.at/m/web-api`.

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:1 -->

1. [Session](#session)
	1. [Get current session](#get-current-session)
	2. [Sign in](#sign-in)
	3. [Sign out](#sign-out)
2. [TBD](#tbd)

<!-- /TOC -->

## Session

### Get current session

```http
GET /m/web-api/session
```

<summary>
	<details>*Response*</details>

	```http
	Content-Type: application/json; charset=utf-8

	{
		"name": "...",
		"iat": "epoch-time",
		"exp": "epoch-time"
	}
	```
</summary>

### Sign in

```http
POST /m/web-api/session

{
	"name": "...",
	"password": "..."
}
```

### Sign out

```http
DELETE /m/web-api/session
```

## TBD
