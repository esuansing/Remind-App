import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [view, setView] = useState('LOGIN')
  const [status, setStatus] = useState({ msg: '', type: '' });

  useEffect(() => {
    if (status.msg) {
      const timer = setTimeout(() => setStatus({ msg: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAuth = async (type) => {
    setStatus({ msg: '', type: '' });

    if (!email.includes('@')) {
    setStatus({ msg: 'Please enter a valid email address.', type: 'error' });
    return;
    }
    
    setLoading(true)
    const { error } = type === 'LOGIN' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ 
        email, 
        password, 
        options: { data: { display_name: username } } 
      })

    if (error) {
      setStatus({msg :error.message, type: 'error'});
    }
    else {
        setEmail('');
        setPassword('');
        setUsername('');
        if (type === 'SIGNUP') {
          setStatus({msg: 'Signup successful! Please check your email for a confirmation link.', type: 'success'});
          setView('LOGIN')
        } else {
          setStatus({msg: 'Login successful! Redirecting...', type: 'success'});
        }
    }
    setLoading(false)
  }

  return (
  <>
    {/* These blobs create the color behind the glass */}
    <div className="blob" style={{ top: '10%', left: '20%' }}></div>
    <div className="blob" style={{ bottom: '10%', right: '20%', background: '#8b5cf6' }}></div>
    
    <div className="glass-card">
      {/* This is your new super transparent top layer */}
      <div className="glass-layer-top">
        {view === 'LOGIN' && (
          <>
          <h1 className="login-title">It's Time to Remind!</h1>
          <p className="login-subtitle">Sign in to Manage Your Alerts</p>
          </>
        )}

        {view === 'SIGNUP' && (
          <>
          <h1 className="login-title">Join Remind Today!</h1>
          <p className="login-subtitle">Create an Account to Start Managing Your Alerts</p>
          </>
        )}

        <form 
          noValidate
          // className = {view === 'LOGIN' ? 'form-login-row' : 'form-signup-column'}
          onSubmit={(e) => { e.preventDefault(); handleAuth(view); }}
        >
          {view === 'SIGNUP' && (
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          )}

          <input 
            type="email" 
            placeholder = {view === 'LOGIN' ? "Email or Username" : "Email Address" }
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {status.msg && (
            <div className={`status-box ${status.type}`}>
              {status.msg}
            </div>
          )}
          <button type="submit">
            {loading ? 'Processing...' : view === 'LOGIN' ? 'Login' : 'Sign Up'}
            </button>
        </form>
        <div className="glass-footer">
          {view === 'LOGIN' ? (
            <>
            <button type="button" onClick={() => alert('Password reset not implemented yet')}>FORGOT PASSWORD?</button>
           <span className="separator">|</span>
            <button type="button" onClick={() => setView('SIGNUP')}>CREATE ACCOUNT</button>
            </>
          ) : (
            <>
            <button type="button" onClick={() => setView('LOGIN')}>Already have an account? Login</button>
            </>
          )}
          
        </div>
      </div>
    </div>
  </>
  )
}