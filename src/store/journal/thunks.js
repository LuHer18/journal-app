import { doc, setDoc, collection, deleteDoc } from "firebase/firestore/lite"
import { fireBaseDB } from "../../firebase/config"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, upDateNote } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"

export const starNewNote = () => {
    return async(dispatch, getState) => {
        
        dispatch(savingNewNote())

        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(fireBaseDB, `${ uid }/journal/notes`))
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        

        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        //dispatch active note
    }
}

export const StartLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        if(!uid) throw new Error('El UID del usuario no existe')
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const starSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth
        const {active: note} = getState().journal

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const docRef = doc(fireBaseDB,`${ uid }/journal/notes/${note.id}` )
        await setDoc(docRef, noteToFireStore, {merge: true})
        dispatch(upDateNote(note));
    }
}

export const starUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrl = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrl))
    }
}

export const starDeletingNote = () => {
    return async(dispatch, getState)=> {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(fireBaseDB,`${ uid }/journal/notes/${note.id}` )

        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))
    }
}
