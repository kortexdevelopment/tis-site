import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { Vehicles, NewVehicle, RemoveVehicle } from '../../controllers/client';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fieldSpacing: {
    marginRight: 20,
    width:'30%',
  },
  fieldSpacingB: {
    marginRight: 20,
    width:'22%',
  },
  containerRoot: {
    display: 'flex',
    marginTop: 25,
    marginBottom: 40,
    flexDirection: 'column',
    overflow: 'scrollable'
  },
  grid: {

  },
  gridHeader: {
      color:'#FFFFFF',
      backgroundColor:'#3973E5',
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientVehicles(props) {
    const classes = useStyles();

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [vehicles, setVehicles] = React.useState([]);

    const [newUser, doNew] = React.useState(false);
    const [newMake, setMake] = React.useState('');
    const [newYear, setYear] = React.useState('');
    const [newGvw, setGvw] = React.useState('');
    const [newVin, setVin] = React.useState('');
    const [newModel, setModel] = React.useState(0);
    const [newValue, setValue] = React.useState('');
    const [newDeductible, setDeductible] = React.useState(0);

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoading();
    });

    React.useEffect(() => {
        if(newUser === false)
        {
            clearInput();
        }
    }, [newUser]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoading = async() =>{
        try{
            var result = await Vehicles(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setVehicles(result);
        isLoading(false);
    }

    const createVehicle = async() =>
    {
        if(![newMake, newYear, newGvw, newVin, newValue].every(Boolean)){
            alert('All parameters are required.');
            return;
        }

        if(newModel === Number(0)){
            alert('Must select an option for MODEL');
            return;
        }

        var vehicle = {
            cid: props.cid,
            make: newMake,
            year: newYear,
            gvw: newGvw,
            vin: newVin,
            model: newModel,
            value: Number(newValue),
            deductible: Number(newDeductible),
        }

        console.log(vehicle);

        try{
            var result = await NewVehicle(vehicle);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while creating the vehicle. Please, try again');
            return;
        }

        alert('Vehicle created successfully!');
        handleRefresh();
        clearInput();
    }

    const removeVehicle = async(vid) =>{
        var vehicle = {
            id:vid
        }

        try{
            var result = await RemoveVehicle(vehicle);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while removing the vehicle. Please, try again');
            return;
        }

        alert('Vehicle removed succcessfully');
        handleRefresh();
    }

    const handleRefresh = async() => {
        try{
            var result = await Vehicles(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setVehicles(result);
    }

    const clearInput = async() => {
        doNew('');
        setMake('');
        setYear('');
        setGvw('');
        setVin('');
        setModel(0);
        setValue('');
        setDeductible(0);
        doNew(false);
    }

  return (
    <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar 
                    variant="dense"
                    style={{
                        backgroundColor:'#3973E5'
                    }}
                >
                    <Typography variant="h6" color="inherit">
                        CLIENT VEHICLES
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

        {loadInfo && (
            <>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 500,
                    }}
                >

                    {!loadError && (
                        <CircularProgress 
                            style={{
                                color:'#3973E5'
                            }}
                        />
                    )}
                    
                    <Typography 
                        variant="h6"
                        style={{
                            color:'#3973E5'
                        }}
                    >
                        {!loadError ? 'Loading Vehicles information...':'Someting whent wrong, try again later...'}
                    </Typography>
                </Box>
            </>
        )}

        <Container
            className={classes.containerRoot}
            style={{
                visibility: loadInfo === true ? 'hidden' : 'visible',
            }}
        >

            <Box>

                <Typography 
                    variant='h6'
                    style={{
                        color:"#3973E5",
                        flex: 1,
                    }}
                >
                    REGISTERED VEHICLES
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#3973E5',
                        fontSize: 15
                    }}

                    onClick={() => doNew(true)}
                >
                    New Vehicle <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'make', headerName: 'MAKE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'year', headerName: 'YEAR', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'gvw', headerName: 'G.V.W.', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'vin', headerName: 'VIN', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'model', headerName: 'MODEL', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'value', headerName: 'VALUE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'deductible', headerName: 'DEDUCTIBLE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: 1, sortable: false, 
                            valueGetter: idGetter,
                            renderCell: (params) =>(
                                <>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            width: '100%',
                                        }}
                                    >
                                        <IconButton
                                            aria-label="DELETE" 
                                            component="span"
                                            style={{
                                                color:'#FF0000',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => removeVehicle(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>

                                        {/* <IconButton
                                            aria-label="EDIT" 
                                            component="span"
                                            style={{
                                                color:'#73E600',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton> */}
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={vehicles} 

                    pageSize={7}
                    disableColumnMenu={true}
                />
            </div>
            
        </Container>

        <Modal
        open={newUser}
        onClose={() => doNew(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            
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
                            NEW VEHICLE
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
                    value={newMake}
                    onChange={(e) => setMake(e.target.value)}
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
                    value={newYear}
                    onChange={(e) => setYear(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="G.V.W."
                    variant="filled" 
                    value={newGvw}
                    onChange={(e) => setGvw(e.target.value)}
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
                    value={newVin}
                    onChange={(e) => setVin(e.target.value)}
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
                        value={newModel}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value={0}>Select one option</MenuItem>
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
                    value={newValue}
                    onChange={(e) => setValue(e.target.value)}
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
                        value={newDeductible}
                        onChange={(e) => setDeductible(e.target.value)}
                    >
                        <MenuItem value={0}>N/A</MenuItem>
                        <MenuItem value={1000}>$1,000</MenuItem>
                        <MenuItem value={2500}>$2,500</MenuItem>
                        <MenuItem value={5000}>$5,000</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createVehicle}
                >
                    Create Vehicle
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
