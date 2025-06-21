import { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { login } from '../store/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Login</h1>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            <button onClick={() => dispatch(login({email, password}))}>
                Login
            </button>
        </div>
    );
};

export default LoginPage; 