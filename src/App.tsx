import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/protectedRoute/AuthProvider'
import { ThemeProvider } from '@mui/material/styles'
import { getStore } from './configureStore'
import Login from './containers/login'
import Navigation from './containers/navigation'
import muiTheme from './theme/muiTheme'
import AllForms from './containers/forms/AllForms'
import FormView from './containers/formEditor/FormView'
import NotificationsProvider from './containers/notifications/NotificationsProvider'
import FormViewer from './containers/formViewer'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

const store = getStore()

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider theme={muiTheme}>
          <div
            className="App"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <NotificationsProvider>
              <Routes>
                <Route path="/v1/:formId" element={<FormViewer />} />
                <Route path="/" element={<Navigation />}>
                  <Route path="*" element={<div>page not found</div>} />
                  <Route
                    path="forms"
                    element={
                      <ProtectedRoute>
                        <AllForms />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="forms/:formId"
                    element={
                      <ProtectedRoute>
                        <FormView />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </NotificationsProvider>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}

export default App
