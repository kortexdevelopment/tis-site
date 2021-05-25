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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  { id: 1, co: 'Accord', naic: 'AJS645', number: 'A654564',  start: '01/24/1990', end: '05/25/2021', cover: 'Liability'},
];


// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientPolicies() {
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
                        CLIENT POLICIES
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
                    REGISTERED POLICIES
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
                    New Policy <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'co', headerName: 'COMPANY', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'naic', headerName: 'NIAC', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'number', headerName: 'P. NUMBER', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'start', headerName: 'START', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'end', headerName: 'END', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'cover', headerName: 'COVERAGE', headerClassName: classes.gridHeader, flex: 1.6},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .8, sortable: false, 
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
                    top: '5%',
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
                            NEW POLICY
                        </Typography>
                    </Toolbar>
                </AppBar>
            
                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Company Name"
                    variant="filled" 
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Company NAIC."
                    variant="filled" 
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Policy Number"
                    variant="filled" 
                />

                <TextField
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    variant="filled" 
                    label="Effective Date"
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
                    label="Expiration Date"
                    type="date"
                    defaultValue="1900-01-01"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <Box
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >

                    <Typography 
                        variant='h6'
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        Policy Coverages
                    </Typography>

                    <Divider />

                </Box>


                <FormGroup s
                    row
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Liability"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Cargo"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Gral. Liability"
                    />
                </FormGroup>

                <FormGroup 
                    row
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="P. Damage"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="T. Interchange"
                    />
                </FormGroup>

                <FormGroup 
                    row
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="T. Non-owned"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Unisured Motorist"
                    />
                </FormGroup>

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
                    Create Policy
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
