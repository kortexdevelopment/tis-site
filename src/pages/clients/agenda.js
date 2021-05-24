import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';

import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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
  { id: 1, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
  { id: 2, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
  { id: 3, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
  { id: 4, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
  { id: 5, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
  { id: 6, nameF: 'Carlos', nameL: 'Reyes', bsn:'Kortex Software', phone:'664 2622625', mail: 'carlos@mail.com'},
];


// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientAgenda() {
  const classes = useStyles();

  const [newClient, doNew] = React.useState(false);

    React.useEffect(() => {
        if(newClient === false)
        {
            //Clear info
        }
    }, [newClient]);

    const createClient = async() =>
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
                        CLIENTS AGENDA
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

                    rows={rows} 

                    pageSize={7}
                    disableColumnMenu={true}
                />
            </div>
            
        </Container>

        <Modal
            open={newClient}
            onClose={() => doNew(false)}
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
                        />
                        <FormHelperText style={{color:"#3973E5"}}>Leave empty for corporations</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <TextField 
                            label="Last Name"
                            variant="filled" 
                        />
                        <FormHelperText style={{color:"#3973E5"}}>Leave empty for corporations</FormHelperText>
                    </FormControl>

                    <TextField 
                        label="B.S.N."
                        variant="filled" 
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
                    />

                    <TextField 
                        label="E-Mail"
                        variant="filled" 
                        style={{
                            width: '40%'
                        }}
                    />

                </Box>

                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createClient}
                >
                    Create Client
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
