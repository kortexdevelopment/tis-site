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
  { id: 1, name: 'Pablito', exp: '1 year', lic: 'LIC654564', state: 'CA', dob: '01/24/1990', doh: '05/25/2021'},
  { id: 2, name: 'Pablito', exp: '1 year', lic: 'LIC654564', state: 'CA', dob: '01/24/1990', doh: '05/25/2021'},
  { id: 3, name: 'Pablito', exp: '1 year', lic: 'LIC654564', state: 'CA', dob: '01/24/1990', doh: '05/25/2021'},
];


// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientDrivers() {
  const classes = useStyles();

  const [newUser, doNew] = React.useState(false);
  const [newModel, setModel] = React.useState(0);

    React.useEffect(() => {
        if(newUser === false)
        {
            //Clean this shit
        }
    }, [newUser]);

    const createDriver = async() =>
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
                        CLIENT DRIVERS
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
                        {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'exp', headerName: 'EXP.', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'lic', headerName: 'LICENSE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'state', headerName: 'STATE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'dob', headerName: 'D.O.B.', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'doh', headerName: 'D.O.H.', headerClassName: classes.gridHeader, flex: 1},
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
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Driving Exp."
                    variant="filled" 
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Driving Licence"
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
                    <InputLabel id="state">State</InputLabel>
                    <Select
                        labelId="state"
                        value={newModel}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value={0}>Select one option</MenuItem>
                        <MenuItem value={'Admin'}>CA - California</MenuItem>
                        <MenuItem value={'Normal'}>AZ- Arizona</MenuItem>
                        <MenuItem value={'Normal'}>NV - Nevada</MenuItem>
                        <MenuItem value={'Normal'}>Other</MenuItem>
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

    </>
  );
}
