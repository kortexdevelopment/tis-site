import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Profile} from '../../controllers/client';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerRoot: {
    display: 'flex',
    marginTop: 8,
    flexDirection: 'column',
    overflow: 'scrollable'
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientProfile(props) {
    const classes = useStyles();
    const [nav, setNav] = React.useState(0);
    const [edit, onEdit] = React.useState(false);
    const [addReady, readyAdd] = React.useState(false);
    const [filReady, readyFil] = React.useState(false);
    const [extReady, readyExt] = React.useState(false);

    const [loadInfo, isLoad] = React.useState(true);
    const [loadError, didError] = React.useState(false);

    const [profile, setProfile] = React.useState(undefined);

    const handleTabs = (event, newValue) =>{
        setNav(newValue);
    }

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoad();
    },[]);

    React.useEffect(() => {
        if(profile === undefined){
            return;
        }

        readyAdd(profile.readyAddress());
        readyFil(profile.readyFiling());
        readyExt(profile.readyAditional());

    },[profile]);

    const handleLoad = async() =>{
        try{
            var result = await Profile(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setProfile(result);
        isLoad(false);
    }
    
    const changeProp = async(prop, value) =>{
        if(profile === undefined || profile[prop] === undefined){
            return;
        }

        var copy = {...profile};
        copy[prop] = value;
        setProfile(copy);
    }

    const debugConsole = async() =>{
        console.log(profile);
        console.log(profile.readyAddress());
        console.log(profile.readyFiling());
        console.log(profile.readyAditional());
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
                        CLIENT PROFILE
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
                            color: '#3973E5'
                        }}
                    >
                        {!loadError ? 'Loading client information...':'Someting whent wrong try again later...'}
                    </Typography>
                </Box>
            </>
        )}

        <Container
            className={classes.containerRoot}
            style={{
                visibility: loadInfo ? 'hidden' : 'visible',
            }}
        >
            
            <AppBar 
                position="static"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Tabs   
                    value={nav} 
                    onChange={handleTabs}
                    style={{
                        backgroundColor: '#3973E5'
                    }}
                >
                    <Tab 
                        label="General Info"    
                    />

                    <Tab 
                        label="Adresses Info"
                        style={{
                            backgroundColor: !addReady ? '#FF5959' : '',
                        }}
                    />

                    <Tab 
                        label="Filing Info" 
                        style={{
                            backgroundColor: !filReady ? '#FF5959' : '',
                        }}
                    />

                    <Tab 
                        label="Additional Info" 
                        style={{
                            backgroundColor: !extReady ? '#FF5959' : '',
                        }}
                    />
                    
                </Tabs>
                <Box
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#3973E5',
                    }}
                >
                    <Typography color="inherit">
                        Edit Info
                    </Typography>
                    <Switch
                        color='secondary'
                        value={edit}
                        onChange={(e) => onEdit(e.target.checked)}
                    />
                    <IconButton
                        style={{
                            color: '#FFFFFF'
                        }}
                        onClick={() => debugConsole()}
                    >
                        <SaveIcon 
                        />
                    </IconButton>
                </Box>
            </AppBar>
            
            
            {nav === 0 && //General Info
            (
                <>
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
                    
                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                }}
                            label="First Name"
                            value={profile ? profile.nameF : ""}
                            onChange={(e) => changeProp("nameF", e.target.value)}
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            label="Last Name"
                            value={profile ? profile.nameL : ""}
                            onChange={(e) => changeProp("nameL", e.target.value)}
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            label="B.S.N."
                            value={profile ? profile.nameB : ""}
                            onChange={(e) => changeProp("nameB", e.target.value)}
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
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '40%'
                            }}
                            value={profile ? profile.phone : ""}
                            onChange={(e) => changeProp("phone", e.target.value)}
                        />

                        <TextField 
                            label="E-Mail"
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}x
                            style={{
                                width: '40%'
                            }}
                            value={profile ? profile.mail : ""}
                            onChange={(e) => changeProp("mail", e.target.value)}
                        />

                    </Box>
                </>
            )}

            {nav === 1 && //Address Info
            (
                <>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            style={{
                                paddingTop:8
                            }}
                        >
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                }}
                            >
                                Garage Info
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:15,
                            }}  
                        >
                            <TextField 
                                label="Address"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.gAddress : ""}
                                onChange={(e) => changeProp("gAddress", e.target.value)}
                            />

                            <TextField 
                                label="City"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.gCity : ""}
                                onChange={(e) => changeProp("gCity", e.target.value)}
                            />

                            <TextField 
                                label="State"
                                inputProps={{
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.gState : ""}
                                onChange={(e) => changeProp("gState", e.target.value)}
                            />

                            <TextField 
                                label="ZIP"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.gZip : ""}
                                onChange={(e) => changeProp("gZip", e.target.value)}
                            />
                        </Box>

                        <Box
                            style={{
                                paddingTop:8
                            }}
                        >
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                }}
                            >
                                Mailing  Info
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:15,
                            }}  
                        >
                            <TextField 
                                label="Address"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.mAddress: ""}
                                onChange={(e) => changeProp("mAddress", e.target.value)}
                            />

                            <TextField 
                                label="City"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.mCity : ""}
                                onChange={(e) => changeProp("mCity", e.target.value)}
                            />

                            <TextField 
                                label="State"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.mState : ""}
                                onChange={(e) => changeProp("mState", e.target.value)}
                            />

                            <TextField 
                                label="ZIP"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.mZip : ""}
                                onChange={(e) => changeProp("mZip", e.target.value)}
                            />
                        </Box>

                        <Box
                            style={{
                                paddingTop:8
                            }}
                        >
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                }}
                            >
                                Working Radius
                            </Typography>

                            <Divider />
                        </Box>

                        <Box>
                            <FormControl 
                                component="fieldset"
                                disabled={!edit}
                            >
                                <RadioGroup
                                    row aria-label="position" 
                                    name="position" 
                                    defaultValue="top"
                                    value={profile ? profile.radius : ""}
                                    onChange={(e) => changeProp("radius", e.target.value)}
                                >
                                    <FormControlLabel
                                        value="100"
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="100"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="200"
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="200"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="300"
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="300"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="500"
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="500"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="11 West"    
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="11 West"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="48 States"
                                        control={<Radio style={{color: '#3973E5'}} />}
                                        label="48 States"
                                        labelPlacement="bottom"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                    </Box>
                </>
            )}
            
            {nav === 2 && //Filing Info
            (
                <>
                    <Box
                        style={{
                            paddingTop:8
                        }}
                    >
                        <Typography 
                            style={{
                                color:"#3973E5",
                                flex: 1,
                            }}
                        >
                            Finance Info
                        </Typography>

                        <Divider />
                    </Box>

                    <Box
                        style={{
                            display:'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                    
                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance A"
                            value={profile ? profile.aFinance : ""}
                            onChange={(e) => changeProp("aFinance", e.target.value)}
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance A - Account Number"
                            value={profile ? profile.aAccount : ""}
                            onChange={(e) => changeProp("aAccount", e.target.value)}
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance B"
                            value={profile ? profile.bFinance : ""}
                            onChange={(e) => changeProp("bFinance", e.target.value)}
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance B - Account Number"
                            value={profile ? profile.bAccount: ""}
                            onChange={(e) => changeProp("bAccount", e.target.value)}
                        />

                    </Box>

                    <Box
                        style={{
                            paddingTop:16
                        }}
                    >
                        <Typography 
                            style={{
                                color:"#3973E5",
                                flex: 1,
                            }}
                        >
                            Filing Info
                        </Typography>

                        <Divider />
                    </Box>

                    <Box
                        style={{
                            display:'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                    
                        <TextField 
                            label="CA Number"
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '30%'
                            }}
                            value={profile ? profile.numCa : ""}
                            onChange={(e) => changeProp("numCa", e.target.value)}
                        />

                        <TextField 
                            label="MC Number"
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '30%'
                            }}
                            value={profile ? profile.numMc : ""}
                            onChange={(e) => changeProp("numMc", e.target.value)}
                        />

                        <TextField 
                            label="US-DOT Number"
                            inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                            style={{
                                width: '30%'
                            }}
                            value={profile ? profile.numUsDot : ""}
                            onChange={(e) => changeProp("numUsDot", e.target.value)}
                        />

                    </Box>
                </>
            )}

            {nav === 3 && //Additional Info
            (
                <>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            style={{
                                paddingTop:8
                            }}
                        >
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Bussines History
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:10,
                            }}  
                        >
                            <TextField 
                                label="Years in Bussines"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.yrsBussines : ""}
                                onChange={(e) => changeProp("yrsBussines", e.target.value)}
                            />

                            <TextField 
                                label="Year Bussines Started"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.yrsStarted : ""}
                                onChange={(e) => changeProp("yrsStarted", e.target.value)}
                            />
                        </Box>

                        <Box>
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Prior Carrier
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:10,
                            }}  
                        >
                            <TextField 
                                label="Enter Information"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.prior : ""}
                                onChange={(e) => changeProp("prior", e.target.value)}
                            />
                        </Box>

                        <Box>
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Commodity A
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:10,
                            }}  
                        >
                            <TextField 
                                label="Description"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.caDesc : ""}
                                onChange={(e) => changeProp("caDesc", e.target.value)}
                            />

                            <TextField 
                                label="Average Value"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.caAverage : ""}
                                onChange={(e) => changeProp("caAverage", e.target.value)}
                            />

                            <TextField 
                                label="Max Value"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.caMax : ""}
                                onChange={(e) => changeProp("caMax", e.target.value)}
                            />

                        </Box>

                        <Box>
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Commodity B
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:10,
                            }}  
                        >
                            <TextField 
                                label="Description"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.cbDesc : ""}
                                onChange={(e) => changeProp("cbDesc", e.target.value)}
                            />

                            <TextField 
                                label="Average Value"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.cbAverage : ""}
                                onChange={(e) => changeProp("cbAverage", e.target.value)}
                            />

                            <TextField 
                                label="Max Value"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.cbMax : ""}
                                onChange={(e) => changeProp("cbMax", e.target.value)}
                            />

                        </Box>

                        <Box>
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Effective Dates
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom:10,
                            }}  
                        >
                            <TextField 
                                label="From"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.dateFrom : ""}
                                onChange={(e) => changeProp("dateFrom", e.target.value)}
                            />

                            <TextField 
                                label="To"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.dateTo : ""}
                                onChange={(e) => changeProp("dateTo", e.target.value)}
                            />

                            <TextField 
                                label="Policy Number"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                value={profile ? profile.numPolicy : ""}
                                onChange={(e) => changeProp("numPolicy", e.target.value)}
                            />

                            <TextField 
                                label="Coverage Type"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.typePolicy : ""}
                                onChange={(e) => changeProp("typePolicy", e.target.value)}
                            />

                        </Box>

                        <Box>
                            <Typography 
                                style={{
                                    color:"#3973E5",
                                    flex: 1,
                                    fontSize: 15
                                }}
                            >
                                Losses
                            </Typography>

                            <Divider />
                        </Box>

                    
                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}  
                        >
                            <TextField 
                                label="No. of Losses"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.losNum : ""}
                                onChange={(e) => changeProp("losNum", e.target.value)}
                            />

                            <TextField 
                                label="Lost Amount"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.losMoney : ""}
                                onChange={(e) => changeProp("losMoney", e.target.value)}
                            />

                            <TextField 
                                label="Driver Involved"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.losDriver : ""}
                                onChange={(e) => changeProp("losDriver", e.target.value)}
                            />

                        </Box>

                        <Box
                            style={{
                                flex:'100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}  
                        >
                            <TextField 
                                label="No. of Moving Violations"
                                inputProps={{
                                    readOnly:!edit,
                                     
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.numViolations : ""}
                                onChange={(e) => changeProp("numViolations", e.target.value)}
                            />

                            <TextField 
                                label="No. of Accidents"
                                inputProps={{
                                    readOnly:!edit,
                                    
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                                value={profile ? profile.numAccidents : ""}
                                onChange={(e) => changeProp("numAccidents", e.target.value)}
                            />

                            <TextField 
                                label="No. of Estimated Annual Miles"
                                inputProps={{
                                    readOnly:!edit,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                                value={profile ? profile.numMiles : ""}
                                onChange={(e) => changeProp("numMiles", e.target.value)}
                            />

                        </Box>


                    </Box>
                </>
            )}

        </Container>

    </>
);
}
