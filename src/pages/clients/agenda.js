import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import {Agenda, NewClient} from '../../controllers/agency';

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

export default function ClientAgenda() {
    const classes = useStyles();
    const session = JSON.parse(window.localStorage.getItem('session')); //compId userTp

    const [agenda, setAgenda] = React.useState([]);
    const [loadAgenda, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);

    const [newClient, doNew] = React.useState(false);
    const [creating, onCreate] = React.useState(false);
    const [formError, setError] = React.useState('');

    const [newNameF, setNameF] = React.useState('');
    const [newNameL, setNameL] = React.useState('');
    const [newNameB, setNameB] = React.useState('');
    const [newPhone, setPhone] = React.useState('');
    const [newMail, setMail] = React.useState('');

    React.useEffect(() => {
        if(!loadAgenda){
            return;
        }
        
        handleLoading();
    });

    React.useEffect(() => {
        if(newClient === false)
        {
            //Clear info
        }
    }, [newClient]);

    const handleLoading = async() =>{
        try{
            var results = await Agenda(session.compId);
        }
        catch(e){
            results = undefined;
        }

        if(results === undefined){
            didError(true);
            return;
        }

        setAgenda(results);
        isLoading(false);
    }

    const createClient = async() =>{
        onCreate(true);
        setError('');

        if(![newNameF, newNameL, newNameB, newPhone, newMail].every(Boolean)){
            setError('*All inputs are required');
            clearForm(false);
            return;
        }   

        try{
            var result = await NewClient(session.compId, newNameF, newNameL, newNameB, newPhone, newMail);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined || result.error){
            setError("Ups... Something went wrong while creating the new client. Please try again.");
            clearForm(false);
            return;
        }

        //change to profile with the created client WIP
        
        clearForm(true);
    }

    const clearForm = async(success) =>{

        if(success)
        {
            setNameF('');
            setNameL('');
            setNameB('');
            setPhone('');
            setMail('');
            doNew(false);
            setError('');
        }

        onCreate(false);
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
                        CLIENTS AGENDA
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

        {loadAgenda && (
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
                        {!loadError ? 'Loading clients information...':'Someting whent wrong, try again later...'}
                    </Typography>
                </Box>
            </>
        )}

        <Container
            className={classes.containerRoot}
            style={{
                visibility: loadAgenda === true ? 'hidden' : 'visible',
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
                    REGISTERED CLIENTS
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
                    New Client <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'nameF', headerName: 'FIRST NAME', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'nameL', headerName: 'LAST NAME', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'bsn', headerName: 'B.S.N.', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'phone', headerName: 'PHONE', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'mail', headerName: 'E-MAIL', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'action ', headerName: '    ACTIONS', headerClassName: classes.gridHeader, flex: 0.8, sortable: false, 
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
                                            aria-label="VIEW PROFILE" 
                                            component="span"
                                            style={{
                                                color:'#3973E5',
                                                marginRight: 12,
                                                fontSize: 15,
                                            }}
                                        >   
                                            <RecentActorsIcon fontSize='large'/>
                                        </IconButton>

                                        
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={agenda}
                    pageSize={7}
                    disableColumnMenu={true}
                />
            </div>
            
        </Container>

        <Modal
            open={newClient}
            onClose={() => clearForm(true)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            
            <Box
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '25%',
                    width: '60%',
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
                            NEW CLIENT
                        </Typography>

                        

                    </Toolbar>
                </AppBar>
            
                <Box
                    style={{
                        padding:8
                    }}
                >
                    <Typography 
                            style={{
                                color: '#FF0000',
                            }}
                        >
                        {formError}
                    </Typography>

                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        Client Info
                    </Typography>

                    <Divider />
                </Box>

                <Box
                    style={{
                        display:'flex',
                        justifyContent: 'space-evenly',
                        padding: 8,
                    }}
                >
                
                    <FormControl>
                        <TextField 
                            label="First Name"
                            variant="filled" 
                            value={newNameF}
                            onChange={(e) => setNameF(e.target.value)}
                        />
                        <FormHelperText style={{color:"#3973E5"}}>Leave empty for corporations</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <TextField 
                            label="Last Name"
                            variant="filled" 
                            value={newNameL}
                            onChange={(e) => setNameL(e.target.value)}
                        />
                        <FormHelperText style={{color:"#3973E5"}}>Leave empty for corporations</FormHelperText>
                    </FormControl>

                    <TextField 
                        label="B.S.N."
                        variant="filled" 
                        value={newNameB}
                        onChange={(e) => setNameB(e.target.value)}
                    />

                </Box>

                <Box
                    style={{
                        padding:8
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        Contact Info
                    </Typography>

                    <Divider />
                </Box>

                <Box
                    style={{
                        display:'flex',
                        justifyContent: 'space-evenly',
                        padding: 8,
                    }}
                >
                
                    <TextField 
                        label="Phone"
                        variant="filled" 
                        style={{
                            width: '40%'
                        }}
                        value={newPhone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <TextField 
                        label="E-Mail"
                        variant="filled" 
                        style={{
                            width: '40%'
                        }}
                        value={newMail}
                        onChange={(e) => setMail(e.target.value)}
                    />

                </Box>

                <Button
                    disabled={creating}
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: creating ? '#A5C0F3' : '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createClient}
                >
                    {creating ? 'Creating ' : 'Create'} Client
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
