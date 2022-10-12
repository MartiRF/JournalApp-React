import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';

export const useCheckAuth = () => {
    
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch();


  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user) => {
      if(!user) return dispatch(logout());
      const {uid, email, phothoURL, displayName} = user;
      dispatch(login({uid,email,phothoURL,displayName}))
    })

  }, [])
  
  return {
    status
  }
}
