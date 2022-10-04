import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid container direction='row' alignItems='center' justifyContent='space-between' sx={{ mb:1 }}>
        <Grid item>
            <Typography fontSize={38} fontWeight='light'> 03 de octubre de 2022</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{ padding:2 }}>
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
            />
        </Grid>
        
        {/* Galeria de imagenes */}
        <ImageGallery />
    </Grid>
    )
}
