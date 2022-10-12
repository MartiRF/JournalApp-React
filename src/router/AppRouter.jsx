import { Navigate, Route, Routes } from 'react-router-dom'
import { AuhtRoutes } from '../auth/routes/AuhtRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { JournalRouter } from '../journal/routes/JournalRouter'
import { CheckingAuth } from '../ui/components/CheckingAuth'

export const AppRouter = () => {

  const { status } = useCheckAuth()
  
  if(status === 'checking') return <CheckingAuth />

  return (
    <Routes>
        
        {status===  'authenticated'
        ? 
        <Route path='/*' element={<JournalRouter />}/>
        :
        <Route path='/auth/*' element={<AuhtRoutes />}/>
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>}/>

        {/* Login y registro */}

        {/* JournalApp */}
    </Routes>
  )
}
