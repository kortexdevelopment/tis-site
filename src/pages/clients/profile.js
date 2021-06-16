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

export default function ClientProfile() {
    const classes = useStyles();
    const [nav, setNav] = React.useState(0);

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
    },[]);

    const handleLoad = async() =>{

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

        <Container
            className={classes.containerRoot}
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
                    <Tab label="General Info"/>
                    <Tab label="Adresses Info"/>
                    <Tab label="Filing Info" />
                    <Tab label="Additional Info" />
                    
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
                    />
                    <IconButton
                        style={{
                            color: '#FFFFFF'
                        }}
                    >
                        <SaveIcon 
                        />
                    </IconButton>
                </Box>
            </AppBar>
            
            {nav === 0 &&
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
                                    readOnly:true,
                                }}
                            label="First Name"
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:true,
                                }}
                            label="Last Name"
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:true,
                                }}
                            label="B.S.N."
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
                                    readOnly:true,
                                }}
                            style={{
                                width: '40%'
                            }}
                        />

                        <TextField 
                            label="E-Mail"
                            inputProps={{
                                    readOnly:true,
                                }}x
                            style={{
                                width: '40%'
                            }}
                        />

                    </Box>
                </>
            )}

            {nav === 1 &&
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="City"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="State"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="ZIP"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="City"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="State"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="ZIP"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
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
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
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
                                        value="11  West"    
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
            
            {nav === 2 &&
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
                                    readOnly:true,
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance A"
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:true,
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance A - Account Number"
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:true,
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance B"
                        />

                        <TextField 
                            inputProps={{
                                    readOnly:true,
                                }}
                            style={{
                                width: '20%'
                            }}
                            label="Finance B - Account Number"
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
                                    readOnly:true,
                                }}
                            style={{
                                width: '30%'
                            }}
                        />

                        <TextField 
                            label="MC Number"
                            inputProps={{
                                    readOnly:true,
                                }}
                            style={{
                                width: '30%'
                            }}
                        />

                        <TextField 
                            label="US-DOT Number"
                            inputProps={{
                                    readOnly:true,
                                }}
                            style={{
                                width: '30%'
                            }}
                        />

                    </Box>
                </>
            )}

            {nav === 3 &&
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Year Bussines Started"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Average Value"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Max Value"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Average Value"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Max Value"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="To"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Policy Number"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                            />

                            <TextField 
                                label="Coverage Type"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Lost Amount"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="Driver Involved"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
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
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="No. of Accidents"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                    marginRight: 8,
                                }}
                                size='small'
                            />

                            <TextField 
                                label="No. of Estimated Annual Miles"
                                inputProps={{
                                    readOnly:true,
                                }}
                                style={{
                                    flex:1,
                                }}
                                size='small'
                            />

                        </Box>


                    </Box>
                </>
            )}

        </Container>

    </>
);
}
