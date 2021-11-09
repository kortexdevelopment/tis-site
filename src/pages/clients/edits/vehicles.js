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

import * as Controller from '../../../controllers/vehicles';

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function VehicleEdit(props) {

    const [boot, didBoot] = React.useState(false);

    const [vehicle, setVehicle] = React.useState({
        id: 0,
        make: '',
        year: '',
        gvw: '',
        vin: '',
        model: '',
        value: 0,
        deductible: 0,
    });

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        handleBoot();
    });

    const handleBoot = async() => {
        setVehicle({...props.vehicle});
    }

    const handleChanges = async(e) => {
        setVehicle({...vehicle, [e.target.name]:e.target.value});
    }

    const handleConfirm = async() => {
        if(![vehicle.make, vehicle.year, vehicle.gvw, vehicle.vin, vehicle.model].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        if(vehicle.vin.length !== 17){
            alert('VIN is missing characters');
            return;
        }

        var doIt = await window.confirm('The information will be updated. \nDo you want to proceed?');

        if(!doIt){
            return;
        }
        
        try{
            var result = await Controller.Update(vehicle);
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
                        EDIT VEHICLE
                    </Typography>
                </Toolbar>
            </AppBar>
        
            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Make"
                variant="filled" 
                name="make"
                value={vehicle.make}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Year"
                type='number'
                variant="filled" 
                name="year"
                value={vehicle.year}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="G.V.W."
                variant="filled" 
                name="gvw"
                value={vehicle.gvw}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                inputProps={{
                    maxLength: 17,
                }}
                label="VIN"
                variant="filled" 
                name="vin"
                value={vehicle.vin}
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
                <InputLabel id="model">Model</InputLabel>
                <Select
                    labelId="model"
                    name="model"
                    value={vehicle.model}
                    onChange={handleChanges}
                >
                    <MenuItem value={'Tractor'}>Tractor</MenuItem>
                    <MenuItem value={'Trailer'}>Trailer</MenuItem>
                    <MenuItem value={'Non Owned'}>Non-Owned</MenuItem>
                    <MenuItem value={'Interchange'}>Interchange</MenuItem>
                </Select>
            </FormControl>
            
            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Value"
                type='number'
                variant="filled" 
                name="value"
                value={vehicle.value}
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
                <InputLabel id="ded">Deductible</InputLabel>
                <Select
                    labelId="ded"
                    name="deductible"
                    value={vehicle.deductible}
                    onChange={handleChanges}
                >
                    <MenuItem value={1000}>$1,000</MenuItem>
                    <MenuItem value={2500}>$2,500</MenuItem>
                    <MenuItem value={5000}>$5,000</MenuItem>
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
