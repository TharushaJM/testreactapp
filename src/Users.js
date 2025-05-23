import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { get, set } from 'mongoose';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = async () => {
        try {
            const response = await Axios.get("http://localhost:3001/api/users");
            setUsers(response.data.response);
            console.log(response.data.response);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    const addUser = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
        };
        Axios.post('http://localhost:3001/api/createusers', payload)
        .then(() => {
            getUsers();
            setSubmitted(false);
            isEdit(false);
        })
        .catch((error) => {
            console.error("Axios error:", error);
        });
    }

        const updateUser = (data) => {
            setSubmitted(true);
            const payload = {
                id  : data.id,
                name: data.name,
    };
    Axios.post('http://localhost:3001/api/updateuser', payload)
    .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
    })
    .catch((error) => {
        console.error("Axios error:", error);
    });

    

    }
    const deleteUser = (data) => {
        Axios.post('http://localhost:3001/api/deleteuser', data)
        .then(() => {
            getUsers();  
        })
        .catch((error) => {
            console.error("Axios error:", error);
        });
    }
    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px',
            }}
        >
            <UsersForm 
            addUser={addUser} 
            updateUser={updateUser}
            submitted={submitted}
            data={selectedUser}
            isEdit={isEdit}
            />
            <UsersTable
            
            rows={users}
            selectedUser={data => {setSelectedUser(data );
                setIsEdit(true); 
            }} 
            deleteUser={data => window.confirm("Are you sure you want to delete this user?") ? deleteUser(data) : null}
            
            />
        </Box>
    );
};

export default Users;