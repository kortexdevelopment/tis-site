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
            </>
        )}

    </>
  );
}
