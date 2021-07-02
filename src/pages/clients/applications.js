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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import DoneIcon from '@material-ui/icons/Done';


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

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientApplications(props) {
    const classes = useStyles();
    const steps = ['Select Agent', 'Select Insurance Company', 'Select Application', 'Select Coverages', 'PDF is Ready!'];
    const [activeStep, setActiveStep] = React.useState(0);

    const [loadInfo, isLoading] = React.useState(true); // Ininiclizar en true
    const [loadError, didError] = React.useState(false);
    
    const [agents, setAgent] = React.useState([]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
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
                        APPLICATIONS
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
                    CREATE APPLICATION
                </Typography>

            </Box>

            <Divider />

            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
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
                            {!loadError ? 'Loading information...':'Someting whent wrong, try again later...'}
                        </Typography>
                    </Box>
                </>
            )}

            {(activeStep === 0 && !loadInfo) && 
            ( 
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid 
                        style={{
                            backgroundColor:'#FF0000'
                        }}
                        columns={[
                            {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                            {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1},
                            {field: 'action', headerName: 'SELECT', headerClassName: classes.gridHeader, flex: .1, sortable: false, 
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
                                                aria-label="SELECT" 
                                                component="span"
                                                style={{
                                                    color:'#FF0000',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                ),
                                }
                            ]} 

                        rows={agents} 

                        pageSize={7}
                        disableColumnMenu={true}
                    />
                </div>
            )}

            {(activeStep === 1 && !loadInfo) && 
            ( 
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid 
                        style={{
                            backgroundColor:'#FF0000'
                        }}
                        columns={[
                            {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                            {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1},
                            {field: 'action', headerName: 'SELECT', headerClassName: classes.gridHeader, flex: .1, sortable: false, 
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
                                                aria-label="SELECT" 
                                                component="span"
                                                style={{
                                                    color:'#FF0000',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                ),
                                }
                            ]} 

                        rows={agents} 

                        pageSize={7}
                        disableColumnMenu={true}
                    />
                </div>
            )}

            {(activeStep === 2 && !loadInfo) && 
            ( 
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid 
                        style={{
                            backgroundColor:'#FF0000'
                        }}
                        columns={[
                            {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                            {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1},
                            {field: 'covers', headerName: 'COVERAGES', headerClassName: classes.gridHeader, flex: 1},
                            {field: 'action', headerName: 'SELECT', headerClassName: classes.gridHeader, flex: .25, sortable: false, 
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
                                                aria-label="SELECT" 
                                                component="span"
                                                style={{
                                                    color:'#FF0000',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                ),
                                }
                            ]} 

                        rows={agents} 

                        pageSize={7}
                        disableColumnMenu={true}
                    />
                </div>
            )}

            {(activeStep === 3 && !loadInfo) && 
                (
                <Container>

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
                            General Coverages
                        </Typography>

                        <Divider />

                    </Box>

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
                                name="liability"
                                color="primary"
                            />
                            }
                            label="Liability"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="cargo"
                                color="primary"
                            />
                            }
                            label="Cargo"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="general"
                                color="primary"
                            />
                            }
                            label="Gral. Liability"
                        />
                    </FormGroup>

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
                            Physical Damage Coverages
                        </Typography>

                        <Divider />

                    </Box>

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
                                name="damage"
                                color="primary"
                            />
                            }
                            label="P. Damage"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="interchange"
                                color="primary"
                            />
                            }
                            label="T. Interchange"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="non"
                                color="primary"
                            />
                            }
                            label="T. Non-owned"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="unisured"
                                color="primary"
                            />
                            }
                            label="Unisured Motorist"
                        />
                    </FormGroup>

                    <Box
                        style={{
                            display:'flex',
                            marginLeft: 15,
                            marginRight: 15,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: '#3973E5',
                                color: '#FFFFFF'
                            }}
                        >
                            GENERATE APPLICATION
                        </Button>
                    </Box>

                </Container>
            )}

            {(activeStep === 4 && !loadInfo) && 
                (
                <Container>
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
                            Application Complete!
                        </Typography>

                        <Divider />

                    </Box>

                    <Box
                        style={{
                            display:'flex',
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 24,
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: '#3973E5',
                                color: '#FFFFFF'
                            }}
                        >
                            PREVIEW PDF
                        </Button>
                    </Box>

                </Container>
            )}

        </Container>

    </>
    );
}
