import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Create a separate CSS file for styling
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import API_BASE_URL from '../config'; // FIX: Use correct import

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // FIX: Add missing state variables
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotUsername, setForgotUsername] = useState('');
  
  // FIX: Add missing forgot password state variables
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  
  // FIX: Add missing reset password state variables
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // FIX: Use API_BASE_URL instead of config.API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handlers
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    setForgotPasswordLoading(true);

    try {
      // FIX: Use API_BASE_URL instead of config.API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setForgotPasswordSuccess('Password reset email sent! Check your inbox.');
        setForgotEmail('');
      } else {
        setForgotPasswordError(data.error || 'Failed to send reset email');
      }
    } catch (error) {
      setForgotPasswordError('Network error. Please try again.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetPasswordError('');
    setResetPasswordSuccess('');
    setResetPasswordLoading(true);

    try {
      // FIX: Use API_BASE_URL instead of config.API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: verificationCode,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResetPasswordSuccess('Password reset successful! You can now log in.');
        setVerificationCode('');
        setNewPassword('');
      } else {
        setResetPasswordError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setResetPasswordError('Network error. Please try again.');
    } finally {
      setResetPasswordLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>LOG IN</h2>
      {!showForgot ? (
        <>
          <form onSubmit={handleSubmit} className="login-form">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword((show) => !show)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </form>
          <div className="login-footer">
            <button 
              type="button" 
              className="link-style" 
              onClick={e => { e.preventDefault(); setShowForgot(true); }}
            >
              Forgot Password?
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={codeSent ? handleResetPassword : handleForgotPassword} className="login-form">
          {!codeSent ? (
            <>
              <div style={{ marginBottom: 10, color: '#2f615d' }}>
                A verification code will be sent to the admin email on file.
              </div>
              <button type="submit" disabled={forgotPasswordLoading}>
                {forgotPasswordLoading ? 'Sending...' : 'Send Code'}
              </button>
              {forgotPasswordError && <div style={{ color: 'red', marginTop: 10 }}>{forgotPasswordError}</div>}
              {forgotPasswordSuccess && <div style={{ color: 'green', marginTop: 10 }}>{forgotPasswordSuccess}</div>}
            </>
          ) : (
            <>
              <input
                type="text"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                placeholder="Verification code"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password"
                required
              />
              <button type="submit" disabled={resetPasswordLoading}>
                {resetPasswordLoading ? 'Resetting...' : 'Reset Password'}
              </button>
              {resetPasswordError && <div style={{ color: 'red', marginTop: 10 }}>{resetPasswordError}</div>}
              {resetPasswordSuccess && <div style={{ color: 'green', marginTop: 10 }}>{resetPasswordSuccess}</div>}
            </>
          )}
          <div className="forgot-message">{forgotMessage}</div>
          <button type="button" className="link-style" onClick={e => { e.preventDefault(); setShowForgot(false); setCodeSent(false); setForgotMessage(''); }}>Back to Login</button>
        </form>
      )}
    </div>
  );
};

export default Login; 