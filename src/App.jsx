import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound } from './components/NotFound';

const App = () => {
    const [users, setUsers] = useState([]);

    return (
        <div>
            <h1>User Management</h1>
            <Router>
              <Routes>
                    <Route path="/" element={<UserForm />} />
                    <Route path="/users" element={<UserTable users={users} setUsers={setUsers} />} />
                    <Route path="*" element={<NotFound/>} />
              </Routes>
            </Router>
        </div>
    );
};

export default App;
