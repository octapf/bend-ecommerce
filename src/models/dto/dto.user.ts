import { IName } from 'models/interfaces/interface.name'

export interface userDTO {
	name: IName
	username: string
	email: string
	password: string
}

export namespace userDTOManager {
	/**
	 * ! Generates userDTO
	 * * octapf - 04/04/2022
	 * @param body
	 * @returns
	 */
	export function generateUserDTO(body: Object): userDTO {
		return <userDTO>body
	}
}
