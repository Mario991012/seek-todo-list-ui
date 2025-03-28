
export const FETCH_TASKS = ( baseUrl: string ) => `${ baseUrl }/v1/tasks`
export const FETCH_TASK = ( baseUrl: string, id: string ) => `${ baseUrl }/v1/tasks/${ id }`
export const CREATE_TASK = ( baseUrl: string ) => `${ baseUrl }/v1/tasks`
export const UPDATE_TASK = ( baseUrl: string, id: string ) => `${ baseUrl }/v1/tasks/${ id }`

export const CREATE_USER = ( baseUrl: string ) => `${ baseUrl }/v1/auth/register`
export const LOGIN_USER = ( baseUrl: string ) => `${ baseUrl }/v1/auth/login`
