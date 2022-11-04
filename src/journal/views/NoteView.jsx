import React, { useEffect, useMemo } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { setActiveNote } from '../../store/journal/journalSlice'
import { startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { startDeletingNote } from '../../store/auth/thunks'

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { body, date, title, onInputChange, formState} = useForm(note)

    const fileInputRef = useRef()

    const dataString = useMemo(() => {
        const newDate = new Date(date).toUTCString()
        return newDate
    },[date])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])
    
    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Nota actualizada',messageSaved, 'success')
        }
    },[messageSaved])

  return (
    <Grid container direction='row' alignItems='center' justifyContent='space-between' sx={{ mb:1 }}>
        <Grid item>
            <Typography fontSize={38} fontWeight='light'>{dataString}</Typography>
        </Grid>

        <Grid item>

            <input type='file' multiple
                ref={fileInputRef}
                onChange={ onFileInputChange }
                style={{display:'none'}}
             />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={()=> {fileInputRef.current.click()}}
            >
                <UploadFileOutlined />
            </IconButton>

            <Button disabled={isSaving} color='primary' sx={{ padding:2 }} onClick={onSaveNote}>
                <SaveOutlined sx={{ fontSize:30, mr:1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingresar un titulo'
                label='Titulo'
                sx={{ border:'none', mb:1 }}
                name='title'
                value={title}
                onChange={onInputChange}
            />
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='Que sucedio hoy'
                minRows={ 5 }
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        
        <Grid>
            <Button
                onClick={onDelete}
                color='error'
                sx={{mt:2}}>
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        {/* Galeria de imagenes */}
        <ImageGallery
            images={note.imageUrls  }
            />
    </Grid>
    )
}
