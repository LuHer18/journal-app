import { loginWithEmailPassword, registeUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, starCreatingUserWithEmailPassword, starLoginWithEmailPassword, startGoogleSignIn } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers')

describe('Pruebas de authThunks', () => { 
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    })


    test('starGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => { 

        const loginData = {ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue(loginData);

        //thunk

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    })
    
    test('starGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => { 

        const loginData = {ok: false, errorMessage: 'Un Error en google'};
        await singInWithGoogle.mockResolvedValue(loginData);

        //thunk

        await startGoogleSignIn()(dispatch);
        
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    })

    test('starCreatingUserWithEmailPassword debe de llamar la creación de usuario - Exito', async() => { 
        const formData = {
            email: demoUser.email,
            password: '1234567',
            displayName: demoUser.displayName
        }

        const {email, password, displayName} = formData
        
        const data = {
            ok: true,
            ...demoUser

        }
        const {uid, photoURL} =  data

        await registeUserWithEmailPassword.mockResolvedValue(data)
        //thunk

        await starCreatingUserWithEmailPassword({email, password, displayName,})(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({displayName, email, uid, photoURL}));
    })

    test('starCreatingUserWithEmailPassword debe de llamar logout - Error', async() => { 
        const formData = {
            email: 'demo@example.com',
            password: '1234567',
            displayName: 'demo Example'
        }
       
        const data = {
            ok: false,
            errorMessage: "Error, no pudiste crear usuario"

        }
        const {errorMessage} = data

        await registeUserWithEmailPassword.mockResolvedValue(data)
        //thunk

        await starCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage}));
    })

    test('starLoginWithEmailPassword debe de llamar login - Exito', async() => { 
        
        const {email, displayName, uid, photoURL}= demoUser
        const data = {
            ok: true,
            uid: uid, 
            photoURL: photoURL

        }
        await loginWithEmailPassword.mockResolvedValue(data)
        //thunk

        await starLoginWithEmailPassword({email, displayName})(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(data));
     })

     test('starLoginWithEmailPassword debe de llamar logout - Error', async() => { 
        
        const {email, displayName, uid, photoURL}= demoUser
        const data = {
            ok: false,
            errorMessage: "Error, valor no ingresado correctamente"

        }
        const {errorMessage} = data

        await loginWithEmailPassword.mockResolvedValue(data)
        //thunk

        await starLoginWithEmailPassword({email, displayName})(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage}));
     })   

 })