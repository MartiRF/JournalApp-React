import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, ButtonBase, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { AuhtLayout } from '../layout/AuhtLayout'

export const RegisterPage = () => {
  return (
    <AuhtLayout title='Crear cuenta'>
          <form>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Nombre Completo" 
                  type='text' 
                  placeholder='Tu nombre' 
                  fullWidth />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña" 
                  type='password' 
                  placeholder='contraseña' 
                  fullWidth />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1}}>
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography>Ya tienes cuenta? </Typography>
                <Link component={RouterLink} color='inherit' to='/auth/login'>
                    Ingresar
                </Link>
              </Grid>


            </Grid>

          </form>
    </AuhtLayout>

  )
}
