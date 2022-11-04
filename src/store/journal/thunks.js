
import {collection, doc, setDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote())

        const {uid} = getState().auth

        const newNote = {
            title:'afd',
            body:'asdf',
            imageUrls:[],
            date:new Date().getTime(),
        }

        const newDoc = doc(collection( FirebaseDB,`${uid}/journal/notes`));
        const setDocReps = await setDoc(newDoc,newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        
    }
}

export const starLoadingNotes = ()=> {
    return async(dispatch, getState) => {

        const {uid} = getState().auth
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())

        const {uid} = getState().auth
        const {active:note} = getState().journal
        // sdefjiosdjfidja asidjfiasdj faaaiijjssdd sd 

        const noteToFireStore = {...note}
        delete noteToFireStore.id;

        //Referencia al documento
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
        await setDoc(docRef,noteToFireStore,{ merge:true})
        dispatch(updateNote(note))
    }
}
export const startUploadingFiles = ( files = [ ]) => {
    return async(dispatch) => {
        dispatch(setSaving())
        
        const fileUploadPromise = [];
        for (const file of files) {
            fileUploadPromise.push(fileUpload(file))
        }
        
        const photosUrls = await Promise.all(fileUploadPromise);
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}