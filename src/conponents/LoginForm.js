import React, {useState} from 'react';
import FirebaseAuthService from "../firebase/FirebaseAuthService";

const LoginForm = ({existingUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
           await FirebaseAuthService.loginUser(username, password)
            setPassword('')
            setUsername('')
        }catch (error) {
            alert(error.message)
        }
    }

    const handleLogout = () => {
        FirebaseAuthService.logoutUser()
    }

    const handleSendResetPasswordEmail = async() => {
        if(!username){
            alert('Missing username')
            return
        }
        try{
            await FirebaseAuthService.sendPasswordResetEmail(username)
            alert('Sent the password reset email, check spam folder if not received.')
        }catch (error){
            alert(error.message)
        }
    }

    const handleLoginWithGoogle = async() => {
        try{
            await FirebaseAuthService.loginWithGoogle()
        }catch(error){
            alert(error.message)
        }
    }
    return (
        <div className='login-form-container'>
            {existingUser ? (
                <div className='row'>
                <h3>Welcome, {existingUser.email}</h3>
                <button type='button' className='primary-button' onClick={handleLogout}>Logout</button>
            </div>
            ):(
                <form onSubmit={handleSubmit} className='login-form'>
                    <label className="input-label login-label">
                        <span>Username (email)</span>
                        <input
                            className='input-text'
                            type="email"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className="input-label login-label">
                        <span>Password</span>
                        <input
                            className='input-text'
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="button-box">
                        <button className='primary-button'>Login</button>
                        <button className='primary-button' type='button' onClick={handleLoginWithGoogle}>Login with Google</button>
                        <button className="primary-button" onClick={handleSendResetPasswordEmail} type='button'>Reset Password</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LoginForm;