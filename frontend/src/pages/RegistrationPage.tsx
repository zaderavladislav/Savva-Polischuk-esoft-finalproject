import { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { registration } from '../store/authSlice';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Registration</h1>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setNickname(e.target.value)}
                value={nickname}
                type="text"
                placeholder='Nickname'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            <button onClick={() => dispatch(registration({email, nickname, password}))}>
                Register
            </button>
        </div>
    );
};

export default RegistrationPage; 