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

import * as Controller from '../../../controllers/drivers';

export default function DriverEdit(props){

    const [boot, didBoot] = React.useState(false);
    const [driver, setDriver] = React.useState({
        id: 0,
        name: '',
        licence: '',
        state: '',
        dob: '',
        doh: '',
        exp: '',
    });

    React.useEffect(() => {
        if(boot)   {
            return;
        }

        didBoot(true);
        handleBoot();
    })

    const handleBoot = async() =>{
        setDriver({...props.driver});
    }

    const handleChanges = async(e) => {
        setDriver({...driver, [e.target.name]:e.target.value});
    }

    const handleConfirm = async() => {
        if(![driver.name, driver.licence, driver.state, driver.dob, driver.doh, driver.exp].every(Boolean)){
            alert('All parameters are required');
            return;
        }        

        var doIt = await window.confirm('The information will be updated. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        try{
            var result = await Controller.Update(driver);
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
                        EDIT DRIVER
                    </Typography>
                </Toolbar>
            </AppBar>
        
            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Driver Name"
                variant="filled" 
                name='name'
                value={driver.name}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Driving Exp."
                variant="filled" 
                name='exp'
                value={driver.exp}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Driving Licence"
                variant="filled" 
                name='licence'
                value={driver.licence}
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
                <InputLabel id="state">State</InputLabel>
                <Select
                    labelId="state"
                    name='state'
                    value={driver.state}
                    onChange={handleChanges}
                >
                    <MenuItem value={'CA'}>CA - California</MenuItem>
                    <MenuItem value={'AZ'}>AZ- Arizona</MenuItem>
                    <MenuItem value={'NV'}>NV - Nevada</MenuItem>
                    <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
            </FormControl>

            <TextField
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                variant="filled" 
                label="Date of Birth"
                type="date"
                defaultValue="1900-01-01"
                InputLabelProps={{
                    shrink: true,
                }}
                name='dob'
                value={driver.dob}
                onChange={handleChanges}
            />

            <TextField
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                variant="filled" 
                label="Date of Hire"
                type="date"
                defaultValue="1900-01-01"
                InputLabelProps={{
                shrink: true,
                }}
                name='doh'
                value={driver.doh}
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
                    CANCEL
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
                    UPDATE
                </Button>
            </Box>
        </Box>
    );
}