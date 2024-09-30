import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = 'https://developerzebi.pro/api'

const UserTable = ({ users, setUsers }) => {
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdateUser = async (id) => {
        try {
            console.log('Update User ID: ',id)
            await axios.put(`${API_URL}/update.php`, { id, name, email });
            fetchUsers(); 
            setEditingUser(null);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                await axios.delete(`${API_URL}/delete.php`, {data: {id}});
                fetchUsers(); 
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/read.php`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{editingUser?.id === user.id ? <input value={name} onChange={(e) => setName(e.target.value)} /> : user.name}</td>
                            <td>{editingUser?.id === user.id ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : user.email}</td>
                            <td>
                                {editingUser?.id === user.id ? (
                                    <>
                                        <button onClick={() => handleUpdateUser(user.id)}>Save</button>
                                        <button onClick={() => setEditingUser(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditingUser(user); setName(user.name); setEmail(user.email); }}>Update</button>
                                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/'}>Back</Link>
        </div>
    );
};

export default UserTable;
