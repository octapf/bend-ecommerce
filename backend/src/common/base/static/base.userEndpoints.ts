/**
 * ! Define User endpoints
 * * octapf - 06/04/2022
 */
export enum Endpoints {
	home = '/',
	signin = '/signin',
	signup = '/signup',
	users = '/users',
	userById = '/users/:id',
	userFirstName = '/users/:id/firstName',
	userLastName = '/users/:id/lastName',
	userPassword = '/users/:id/password',
	userEmail = '/users/:id/email',
	username = '/users/:id/username',
	validateUsername = '/users/validateUsername',
	validateUserEmail = '/users/validateUserEmail',
}
