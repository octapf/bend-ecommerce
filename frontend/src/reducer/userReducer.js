import { userConstants } from '../constants/userConstants'

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case userConstants.USER_LIST_REQUEST:
			break

		default:
			break
	}
}
