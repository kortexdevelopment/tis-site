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

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

const rows = [
  { id: 1, make: 'Ford', year: '2005', gvw: '15T', model: 'Tractor', value: '$1000', ded: '$5000'},
  { id: 3, make: 'Ford', year: '2005', gvw: '15T', model: 'Tractor', value: '$1000', ded: '$5000'},
  { id: 4, make: 'Ford', year: '2005', gvw: '15T', model: 'Tractor', value: '$1000', ded: '$5000'},
];


// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientVehicles() {
  const classes = useStyles();

  const [newUser, doNew] = React.useState(false);
  const [newModel, setModel] = React.useState(0);

    React.useEffect(() => {
        if(newUser === false)
        {
            //Clean this shit
        }
    }, [newUser]);

    const createVehicle = async() =>
    {
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

        <Container
            className={classes.containerRoot}
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
                        {field: 'model', headerName: 'VIN', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'value', headerName: 'VALUE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'ded', headerName: 'DEDUCTIBLE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: 1, sortable: false, 
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
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={rows} 

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
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="G.V.W."
                    variant="filled" 
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="VIN"
                    variant="filled" 
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
                        <MenuItem value={'Admin'}>Tractor</MenuItem>
                        <MenuItem value={'Normal'}>Trailer</MenuItem>
                        <MenuItem value={'Normal'}>Non-Owned</MenuItem>
                        <MenuItem value={'Normal'}>Interchange</MenuItem>
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
                        value={newModel}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value={0}>Select one option</MenuItem>
                        <MenuItem value={'Admin'}>N/A</MenuItem>
                        <MenuItem value={'Normal'}>$1,000</MenuItem>
                        <MenuItem value={'Normal'}>$2,500</MenuItem>
                        <MenuItem value={'Normal'}>$5,000</MenuItem>
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
