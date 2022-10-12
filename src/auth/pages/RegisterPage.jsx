import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, ButtonBase, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { AuhtLayout } from '../layout/AuhtLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email:'',
  password:'',
  displayName:'',
}

const formValidations = {
  email:[(value='') => value.includes('@'), 'El correo debe de tener una @'],
  password:[(value='') => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName:[(value='') => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
  
  const {status, errorMenssage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid   } = useForm(formData, formValidations)
  
  const onSumit = (event) => {
    event.preventDefault()
    setFormSubmitted(true);

    if ( !isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState))
  }
  

  return (
    <AuhtLayout title='Crear cuenta'>
      {/* <h1>FormValid: { isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}
          <form onSubmit={onSumit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Nombre Completo" 
                  type='text' 
                  placeholder='Tu nombre' 
                  fullWidth
                  name='displayName'
                  value={displayName}
                  onChange={onInputChange}
                  error={!!displayNameValid && formSubmitted}
                  helperText={displayNameValid} />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña" 
                  type='password' 
                  placeholder='contraseña' 
                  fullWidth
                  name='password'
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid && formSubmitted}
                  helperText={passwordValid}  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Correo Electrotico" 
                  type='email' 
                  placeholder='ejemplo@gmail.com' 
                  fullWidth
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={emailValid}  />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1}}>
                <Grid display={!!errorMenssage ? '' : 'none'} item xs={12}>
                  <Alert severity='error'>
                    {errorMenssage}
                  </Alert>
                </Grid>

                <Grid item xs={12}>
                  <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
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
