import { collection, getDocs } from "firebase/firestore/lite"
import { fireBaseDB } from "../firebase/config"

export const loadNotes = async(uid = '')=> {
    if(!uid) throw new Error('El UID del usuario no existe')

    const collecionRef = collection(fireBaseDB,`${ uid }/journal/notes` );
    const docs = await  getDocs(collecionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data()})
    })

    return notes;
}