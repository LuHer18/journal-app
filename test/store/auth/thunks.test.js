import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";


jest.mock('../../../src/firebase/providers')

describe('Pruebas de authThunks', () => { 
    const dispatch = jest.fn()
    beforeEach(()=> jest.clearAllMocks())
    test('debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

     })
 })