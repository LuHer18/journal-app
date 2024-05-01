import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
    })

    test('debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated', // 'checking' , 'authenticated'
            uid: '123ABC',
            email: 'prueba@correo.com',
            displayName: 'Demo user',
            photoURL: 'https://demo.jpg',
            errorMessage: null,
        })
    })

    test('debe de realizar el logout sin argumentos', () => {

        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual(
            {
                status: 'not-authenticated', // 'checking' , 'authenticated'
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: undefined,
            }
        )
    })

    test('debe de realizar el logout con argumentos', () => {

        const errorMessage = 'Credenciales no son correctas'

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual(
            {
                status: 'not-authenticated', // 'checking' , 'authenticated'
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: errorMessage,
            }
        )
    })

    test('debe de cambiar su estado a checking', () => { 

        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')

     })

})