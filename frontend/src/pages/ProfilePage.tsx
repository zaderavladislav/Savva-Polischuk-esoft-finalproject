import { useEffect, useState } from 'react';
import type { IUser } from '../models/IUser';
import authService from '../services/auth.service';

const ProfilePage = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authService.getProfile();
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
            <div className="mt-4">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Nickname:</strong> {user.nickname}</p>
                <p><strong>Rating:</strong> {user.rating}</p>
            </div>
        </div>
    );
};

export default ProfilePage; 