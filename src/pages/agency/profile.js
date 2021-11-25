import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Profile} from '../../controllers/agency';

import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import * as API from '../../lib/api';

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
    flexDirection: 'column'
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red
export default function AgencyProfile() {
    const classes = useStyles();
    
    const session = JSON.parse(window.localStorage.getItem('session'));
    const [profileInfo, setInfo] = React.useState(undefined);
    const [loadInfo, isLoad] = React.useState(true);
    const [loadError, didError] = React.useState(false);


    const [newUser, doNew] = React.useState(false);
    const [psswd, setPsswd] = React.useState('');
    const [psswdConfirm, setPsswdConfirm] = React.useState('');

    React.useEffect(() =>{
        if(!loadInfo)
        {
            return;
        }

        handleLoading();
    },[]);

    const handleLoading = async() => {
        try{
            var response = await Profile(session.compId);
        }
        catch(e){
            console.error(`Error loading agency profile.\n${e}`);
            response = undefined;
        }

        if(response === undefined){
            didError(true);
            return;
        }

        setInfo(response);
        isLoad(false);
    }

    const changePassword = async() =>
    {
        console.log(`Creating new agent Name:${psswd} Mail:${psswdConfirm}`);
        
        if(psswd !== psswdConfirm)
        {
            alert('Password must match');
            return;
        }
        else
        {
            console.log(session.userId);
            try{
                var result = await API.changePasswd(psswd, session.userId);
                if(result.result)
                    window.alert("Password successfully modified.");
                else
                    window.alert("An error ocurred, please try again in a couple of minutes.");
            }
            catch(e){
                console.error(`Controller Error : AGENCY.NEW AGENT \n${e}`);
                return undefined;
            }
        }
        doNew(false);
        setPsswd('');
        setPsswdConfirm('');
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
                        AGENCY PROFILE
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
                        {!loadError ? 'Loading agency information...':'Someting whent wrong try again later...'}
                    </Typography>
                </Box>
            </>
        )}

        {!loadInfo && (
            <>
            <Container
                className={classes.containerRoot}
            >

                <Typography 
                    variant='h6'
                    style={{
                        color:"#3973E5"
                    }}
                >
                    GENERAL INFO
                </Typography>

                <Divider 
                    style={{
                        marginBottom:20,
                    }}
                />

                <Box
                    style={{
                        width:'100%'
                    }}
                >
                    <TextField 
                        className={classes.fieldSpacing}
                        label="AGENCY NAME"
                        inputProps={{
                            readOnly:true,
                        }} 
                        value={profileInfo?.agencyName}
                    />

                    <TextField 
                        className={classes.fieldSpacing}
                        label="PRODUCER NAME"
                        inputProps={{
                            readOnly:true,
                        }} 
                        value={profileInfo?.producerName}
                    />

                    <TextField 
                        className={classes.fieldSpacing}
                        label="LICENSE NUMBER" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.license}
                    />
                </Box>

            </Container>

            <Container
                className={classes.containerRoot}
            >
                
                <Typography 
                    variant='h6'
                    style={{
                        color:"#3973E5"
                    }}
                >
                    CONTACT INFO
                </Typography>

                <Divider 
                    style={{
                        marginBottom:20,
                    }}
                />

                <Box
                    style={{
                        width:'100%'
                    }}
                >
                    <TextField 
                        className={classes.fieldSpacing}
                        label="PHONE NUMBER" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.phoneNumber}
                    />

                    <TextField 
                        className={classes.fieldSpacing}
                        label="FAX NUMBER" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.faxNumber}
                    />

                    <TextField 
                        className={classes.fieldSpacing}
                        label="E-MAIL NUMBER" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.email}
                    />
                </Box>
            </Container>

        
            <Container
                className={classes.containerRoot}
            >

                <Typography 
                    variant='h6'
                    style={{
                        color:"#3973E5"
                    }}
                >
                    LOCATION INFO
                </Typography>

                <Divider 
                    style={{
                        marginBottom:20,
                    }}
                />

                <Box
                    style={{
                        width:'100%'
                    }}
                >
                    <TextField 
                        className={classes.fieldSpacingB}
                        label="ADDRESS" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.address}
                    />

                    <TextField 
                        className={classes.fieldSpacingB}
                        label="CITY" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.city}
                    />

                    <TextField 
                        className={classes.fieldSpacingB}
                        label="STATE" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.state}
                    />

                    <TextField 
                        className={classes.fieldSpacingB}
                        label="ZIP" 
                        inputProps={{
                            readOnly:true,
                        }}
                        value={profileInfo?.zip}
                    />
                </Box>
            </Container>
            <Container
                className={classes.containerRoot}
            >
                <Typography 
                    variant='h6'
                    style={{
                        color:"#3973E5"
                    }}
                >
                    Security
                </Typography>

                <Divider 
                    style={{
                        marginBottom:20,
                    }}
                />
            <Button
                    style={{
                        width:"200px",
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 0,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={() => doNew(true)}
                >
                    Change Password
                </Button>
                </Container>
                <Modal
                    open={newUser}
                    onClose={() => {
                        doNew(false);
                        setPsswd('');
                        setPsswdConfirm('');
                    }}
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
                            Change Password
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Password"
                    variant="filled" 
                    type='password'
                    value={psswd}
                    onChange={(e) => setPsswd(e.target.value)}
                />

                <TextField 
                    type='password'
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Confirm Password"
                    variant="filled"
                    value={psswdConfirm}
                    onChange={(e) => setPsswdConfirm(e.target.value)}
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

                    onClick={changePassword}
                >
                    Change Password
                </Button>
            </Box>
                </Modal>  
            </>
        )}
    </>
  );
}
