import React from 'react';
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

import * as Controller from '../../../controllers/agencyUsers';

export default function UsersEdit(props){

    const [boot, didBoot] = React.useState(false);
    const [user, setUser] = React.useState({
        id: 0,
        name: '',
        mail: '',
        pass: '',
        level: 0,
    });

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        setUser({...props.user});
    });

    const handleChanges = async(e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const handleConfirm = async() => {
        if(![user.name, user.mail, user.pass].every(Boolean)){
            alert('All paramters are required');
            return;
        }

        var doIt = await window.confirm("The information will be updated. \nDo you want to proceed?");

        if(!doIt){
            return;
        }

        try{
            var result = await Controller.Update(user);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while updating information. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.success){
            props.onSuccess();
        }
    }

    return(
        <Box
            style={{
                position: 'absolute',
                top: '10%',
                left: '40%',
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
                        backgroundColor:'#3973E5'
                    }}
                >
                    <Typography variant="h6" color="inherit">
                        EDIT AGENT
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
                name='mail'
                value={user.mail}
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
                    name='level'
                    value={user.level}
                    onChange={handleChanges}
                >
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={1}>Normal</MenuItem>
                </Select>
            </FormControl>

            <Box>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#FF1111',
                        color: '#FFFFFF'
                    }}

                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={handleConfirm}
                >
                    Update
                </Button>
            </Box>

        </Box>
    );
}