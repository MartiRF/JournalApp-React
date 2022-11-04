import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, ButtonBase, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuhtLayout } from '../layout/AuhtLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const FormData = {
  email:'',
  password:''
}

export const LoginPage = () => {
  
  
  const {status, errorMenssage} = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm( FormData )
  
  const isAuthenticating = useMemo(()=> status === 'checking', [status])

  const onSumit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}))
  }

  const onGoogleSingIn = () => {
    dispatch( startGoogleSingIn() )
  }

  return (
    <AuhtLayout title='Login'>
          <form onSubmit={onSumit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Correo" 
                  type='email' 
                  placeholder='ejemplo@correo.com' 
                  fullWidth
                  name='email'
                  value={email}
                  onChange={onInputChange} />

              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña" 
                  type='password' 
                  placeholder='contraseña' 
                  fullWidth
                  name='password'
                  value={password}
                  onChange={onInputChange} />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1}}>
                <Grid item xs={12} display={!!errorMenssage ? '' : 'none'} >
                  <Alert severity='error'>
                    {errorMenssage}
                  </Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}> <Button disabled={isAuthenticating} variant='contained' fullWidth onClick={onGoogleSingIn}> <Google /> <Typography sx={{ml:1}}> Google</Typography> </Button> </Grid> </Grid> <Grid container direction='row' justifyContent='end'>
                <Link component={RouterLink} color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>


            </Grid>

          </form>
    </AuhtLayout>

  )
}
