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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Drivers, NewDriver, RemoveDriver } from '../../controllers/drivers';
import DriverEdit from './edits/drivers';
import Searcher from '../../components/search';

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

export default function ClientDrivers(props) {
    const classes = useStyles();

    const [newUser, doNew] = React.useState(false);
    const [newModel, setModel] = React.useState(0);

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [drivers, setDrivers] = React.useState([]);
    const [original, setOriginal] = React.useState([]);

    const [newName, setNam] = React.useState('');
    const [newExp, setExp] = React.useState('');
    const [newLicence, setLic] = React.useState('');
    const [newState, setSta]  = React.useState(0);
    const [newDob, setDob] = React.useState('');
    const [newDoh, setDoh] = React.useState('');

    const [test, setTest] = React.useState(new Date());
    const [delId, setDel] = React.useState(0);

    const [edit, showEdit] = React.useState(false);
    const [editDriver, setEdit] = React.useState(undefined);

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

    React.useEffect(() => {
        showEdit(editDriver !== undefined);
    },[editDriver]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoading = async() =>{
        try{
            var result = await Drivers(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setDrivers(result);
        setOriginal(result);
        isLoading(false);
    }

    const createDriver = async() =>
    {
        if(![newName, newLicence, newExp, newDob, newDoh].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        if(newState === Number(0)){
            alert('Must select an STATE option');
            return;
        }

        var driver = {
            cid: props.cid,
            name: newName,
            licence: newLicence,
            state: newState,
            dob: newDob,
            doh: newDoh,
            exp: newExp,
        }

        try{
            var result = await NewDriver(driver);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while creating the driver. Please, try again');
            return;
        }

        alert('Driver created successfully!');
        handleRefresh();
        clearInput();
    }

    const removeDriver = async(id) =>{
        var doIt = await window.confirm('The selected Driver will be deleted. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        setDel(id);

        var driverData = {
            id: id,
        }

        try{
            var result = await RemoveDriver(driverData);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while removing the driver. Please, try again');
            return;
        }

        alert("Driver removed successfully!");
        handleRefresh();
        setDel(0);
    }

    const handleRefresh = async() =>{
        try{
            var result = await Drivers(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            return;
        }

        setDrivers(result);
        setOriginal(result);
    }

    const clearInput = async() =>{
        doNew(false);
        setNam('');
        setExp('');
        setLic('');
        setDoh('');
        setDob('');
        setSta(0);
    }

    const handleEditSelect = async(id) => {
        var result = drivers.find(x => x.id === id);
        setEdit(result);
    }

    const handleEditCancel = async() => {
        var doIt = await window.confirm('The progress will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        setEdit(undefined);
    }

    const handleEditSuccess = async() => {
        handleRefresh();
        setEdit(undefined);
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
                        CLIENT DRIVERS
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
                        {!loadError ? 'Loading Drivers information...':'Someting whent wrong, try again later...'}
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
                    REGISTERED DRIVERS
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Searcher onUpdate={setDrivers} original={original} fields={['name', 'licence', 'state']} color='#3973E5'/>

                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#3973E5',
                        fontSize: 15
                    }}

                    onClick={() => doNew(true)}
                >
                    New Driver <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1.3},
                        {field: 'exp', headerName: 'EXP.', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'licence', headerName: 'LICENSE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'state', headerName: 'STATE', headerClassName: classes.gridHeader, flex: .5},
                        {field: 'dobLabel', headerName: 'D.O.B.', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'dohLabel', headerName: 'D.O.H.', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .7, sortable: false, 
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
                                            onClick={() => removeDriver(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="EDIT" 
                                            component="span"
                                            style={{
                                                color:'#73E600',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleEditSelect(params.value)}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={drivers} 

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
                            NEW DRIVER
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
                    value={newName}
                    onChange={(e) => setNam(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Driving Exp."
                    variant="filled" 
                    value={newExp}
                    onChange={(e) => setExp(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Driving Licence"
                    variant="filled" 
                    value={newLicence}
                    onChange={(e) => setLic(e.target.value)}
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
                        value={newState}
                        onChange={(e) => setSta(e.target.value)}
                    >
                        <MenuItem value={0}>Select one option</MenuItem>
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
                    value={newDob}
                    onChange={(e) => setDob(e.target.value)}
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
                    value={newDoh}
                    onChange={(e) => setDoh(e.target.value)}
                />

                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createDriver}
                >
                    Create Driver
                </Button>
            </Box>
            
        </Modal>        

        <Modal
            open={edit}
            onClose={handleEditCancel}
        >
            <DriverEdit onCancel={handleEditCancel} onSuccess={handleEditSuccess} driver={editDriver} />
        </Modal>

    </>
  );
}
