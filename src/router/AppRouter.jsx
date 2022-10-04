import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuhtRoutes } from '../auth/routes/AuhtRoutes'
import { JournalRouter } from '../journal/routes/JournalRouter'

export const AppRouter = () => {
  return (
    <Routes>
        
        {/* Login y registro */}
        <Route path='auth/*' element={<AuhtRoutes />}/>

        {/* JournalApp */}
        <Route path='/*' element={<JournalRouter />}/>
    </Routes>
  )
}
