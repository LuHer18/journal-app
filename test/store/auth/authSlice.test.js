import { authSlice, login } from "../../../src/store/auth/authSlice"
import { demoUser, initialState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
    })

    test('debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        console.log(state)

        expect(state).toEqual({
            status: 'authenticated', // 'checking' , 'authenticated'
            uid: '123ABC',
            email: 'prueba@correo.com',
            displayName: 'Demo user',
            photoURL: 'https://demo.jpg',
            errorMessage: null,
        })
    })

})