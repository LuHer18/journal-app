import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { starNewNote } from "../../../src/store/journal/thunks";
import { fireBaseDB } from "../../../src/firebase/config";

describe('Pruebas en el Journal thunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();
    
    beforeEach(()=> jest.clearAllMocks());

    test('debe de crear una nueva nota en blanco', async() => { 

        const uid = 'TestUid'

        getState.mockReturnValue({auth:{uid: uid}})

        await starNewNote()(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)

        }))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)

        }))

        //borrar de firebase
        const colectionRef = collection(fireBaseDB, `${ uid }/journal/notes`)
        const docs = await getDocs(colectionRef);
        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
        
        await Promise.all(deletePromises)
    })
 })