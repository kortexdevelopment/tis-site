import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as Controller from '../../../controllers/app';

export default function AppUserEdit(props){

    const [boot, didBoot] = React.useState(false);
    const [user, setUser] = React.useState({
        id: 0,
        user: '',
        pass: '',
    });

    React.useEffect(() => { 
        if(boot){
            return;
        }

        didBoot(true);
        setUser({...props.user});
    });

    const handleChanges = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleConfirm = async() =>{
        var reg = /[@,\s#%]+/g;

        if(![user.user, user.pass].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        if(reg.test(user.user)){
            alert('User contains ivalid characters. Please, verify information');
            return;
        }

        if(reg.test(user.pass)){
            alert('Password contains ivalid characters. Please, verify information');
            return;
        }
        handleProcess();
    }

    const handleProcess = async() => {
        var doIt = await window.confirm('The information will be updated. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var data = user;
        data.user = `${user.user}@${user.domain}`;
        
        try{
            var result = await Controller.Update(data);
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
                        EDIT CREDENTIAL
                    </Typography>
                </Toolbar>
            </AppBar>
        
            <FormControl>
                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Credential Name"
                    name='user'
                    value={user.user}
                    onChange={handleChanges}
                />
                <FormHelperText style={{color:"#3973E5", marginLeft:15}}>
                    Just enter a name. The @domain.dot will be assigned by the system
                </FormHelperText>
            </FormControl>

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Credential Password"
                name='pass'
                value={user.pass}
                onChange={handleChanges}
            />

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