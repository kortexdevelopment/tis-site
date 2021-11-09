import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import * as Controller from '../../../controllers/corporate';

export default function Create(props) {

    const [user, setUser] = React.useState({
        name: '',
        email: '',
        pass: '',
        role: '',
    });

    const validEmail = (mail) =>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const handleChanges = async(e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }

    const handleConfirm = async() => {
        if(![user.name, user.email, user.pass, user.role].every(Boolean)){
            alert('All parameter are required. Please, verify your info');
            return;
        }

        if(!validEmail(user.email)){
            alert('E-mail ivalid format');
            return;
        }

        handleCreate();
    }

    const handleCreate = async() => {
        try{
            var result = await Controller.UserCreate(user);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while creating user. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.success){
            props.onSuccess();
        }
    }

  return (
    <>
        <Box
            style={{
                position: 'absolute',
                top: '10%',
                left: '30%',
                width: '40%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar position="static">
                <Toolbar 
                    variant="dense"
                    style={{
                        backgroundColor:'#3d3d3d'
                    }}
                >
                    <Typography variant="h6" color="inherit">
                        EDIT USER
                    </Typography>
                </Toolbar>
            </AppBar>
        
            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Agent Name"
                variant="filled" 
                name='name'
                value={user.name}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="E-Mail"
                variant="filled"
                name='email'
                value={user.email}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Password"
                variant="filled"
                name='pass'
                value={user.pass}
                onChange={handleChanges}
            />

            <FormControl 
                variant="filled"
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
            >
                <InputLabel id="levelLabel">Access Level</InputLabel>
                <Select
                    labelId="levelLabel"
                    name='role'
                    value={user.role}
                    onChange={handleChanges}
                >
                    <MenuItem value="">Select one option</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>Normal</MenuItem>
                </Select>
            </FormControl>

            <Box>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#FF5555',
                        color: '#FFFFFF'
                    }}

                    onClick={props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3d3d3d',
                        color: '#FFFFFF'
                    }}

                    onClick={handleConfirm}
                >
                    Create 
                </Button>
            </Box>
        </Box>      

    </>
  );
}
