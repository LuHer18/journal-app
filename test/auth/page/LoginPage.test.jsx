import { fireEvent, render, screen } from "@testing-library/react"
import { LogingPage } from "../../../src/auth/pages/LogingPage"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../src/store/auth/authSlice"
import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStarGoogleSignIn = jest.fn();
const mockStarLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn: () => mockStarGoogleSignIn,
    starLoginWithEmailPassword: ({email, password}) => {
        return () => mockStarLoginWithEmailPassword({email, password})
    },
}))

jest.mock('react-redux', ()=> ({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=> (fn)=> fn(),
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Prueba en el <LoginPage/>', () => { 

    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => { 

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LogingPage/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
        
    })

    test('boton de google debe de llamar el starGoogleSignIn ', () => { 

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LogingPage/>
                </MemoryRouter>
            </Provider>
        )
        const googleBtn = screen.getByLabelText('google-btn')
        fireEvent.click(googleBtn)
        console.log(store.getState())
        expect(mockStarGoogleSignIn).toHaveBeenCalled();
    })

    test('submit debe de llamar starLoginWithEmailPassword', () => { 

        const email = 'luis@google.com';
        const password = '1234567';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LogingPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'Correo'})
        fireEvent.change(emailField, {target: {name: 'email', value: email}})
        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, {target: {name: 'password', value: password}})

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit(loginForm)
        
        expect(mockStarLoginWithEmailPassword).toHaveBeenCalledWith({ email: email, password: password})
     })


 })