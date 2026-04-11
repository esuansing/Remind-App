import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js' // Ensure this matches your connection file name
import Login from './login.jsx' // Changed to lowercase 'l' to match your file

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      return; 
    }

    // Check for an active session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      {!session ? (
        <Login /> 
      ) : (
        <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
          <h1>Welcome to Remind</h1>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default App;