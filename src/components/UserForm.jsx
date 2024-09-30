import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'https://developerzebi.pro/api'

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        if (!name || !email) {
            alert('Both fields are mandatory!');
            return;
        }

        try {
            await axios.post(`${API_URL}/create.php`, { name, email });
            setName('');
            setEmail('');
            handleGetUsers(); 
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleGetUsers = () => {
        navigate('/users'); 
    };

    return (
        <div className='userInput'>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleGetUsers}>Get Users</button>
        </div>
    );
};

export default UserForm;
