import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import logo from '../media/logo.png';

import Info from './info';
import AgencyProfile from './agency/profile';
import AgencyUsers from './agency/users';

import ClientAgenda from './clients/agenda';
import ClientProfile from './clients/profile';
import ClientApp from './clients/app';
import ClientCoverage from './clients/coverages';
import ClientVehicles from './clients/vehicles';
import ClientDrivers from './clients/drivers';
import ClientPolicies from './clients/policies';
import ClientDocs from './clients/documents';
// 3973E5 primary
// A5C0F3 secondary
// FF0000 red


const useStyles = makeStyles((theme) => ({
    Main: {
        backgroundColor:'#3973E5',
    },
    MainText: {
        color:'#FFFFFF',
    },
    Sub: {
        backgroundColor:'#A5C0F3',
    },
    Text: {
        color:'#3973E5',
        marginTop: 5,
    },
    Box:{
        display:'flex',     
        flexDirection:'column',
        width: '100%',
    },
}));

export default function Main() {

    const scrH = window.innerHeight;
    // const scrW = window.innerWidth;

    const classes = useStyles();
    let history = useHistory();

    const [panel, SetPanel] = React.useState(0);
    // const [client, HasClient] = React.useState(false);
    const [action, SetAction] = React.useState('');

    const handlePanels = (panel) => (event, isExpanded) => {
        SetPanel(isExpanded ? panel : false);
    }

    const handleLogout = async() =>{
        history.push("/");
    }

    const handleAction = async(_action) =>{
        SetAction(_action);
    }

    return (
    <>
        <Box
            style={{
                display:'flex',
            }}
        >
            <Paper 
                square
                style={{
                    flex:'10%',
                    backgroundColor: '#3973E5',
                    height: scrH,
                }}
            >
                <img 
                    style={{height: 100,
                            width: 250,
                    }}
                    src={logo} 
                    alt="TIS Logo" 
                />

                <Button
                        style={{
                            width:200,
                            marginBottom: 10,
                            marginLeft: 25,
                            backgroundColor: '#FF0000',
                            borderRadius: 16
                        }}
                        variant='contained'
                        onClick={handleLogout}
                >
                    Log out
                </Button>

                <Box
                    style={{
                        maxHeight: scrH * 0.9,
                    }}
                >

                    <Accordion 
                        square
                        expanded={panel === 1}
                        onChange={handlePanels(1)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.Main}
                        >
                            <Typography 
                                variant='h6'
                                className={classes.MainText}
                                >
                                Agency
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            className={classes.Sub}
                        >
                            <Box
                                className={classes.Box}
                            >
                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('AgencyProfile')}
                                >
                                    Profile
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('AgencyUsers')}
                                >
                                    Agents
                                </Button>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion 
                        square
                        expanded={panel === 2}
                        onChange={handlePanels(2)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.Main}
                        >
                            <Typography 
                                variant='h6'
                                className={classes.MainText}
                                >
                                Clients
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            className={classes.Sub}
                        >
                            <Box
                                className={classes.Box}
                            >
                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientAgenda')}
                                >
                                    Agenda
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion 
                        square
                        expanded={panel === 3}
                        onChange={handlePanels(3)}
                        style={{
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.Main}
                        >
                            <Typography 
                                variant='h6'
                                className={classes.MainText}
                                >
                                Client Actions
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            className={classes.Sub}
                        >
                            <Box
                                className={classes.Box}
                            >
                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientProfile')}
                                >
                                    Profile
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientApp')}
                                >
                                    Mobile App
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientCoverage')}
                                >
                                    Coverages
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientVehicles')}
                                >
                                    Vehicles
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientDrivers')}
                                >
                                    Drivers
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientPolicies')}
                                >
                                    Policies
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleAction('ClientDocs')}
                                >
                                    Documents
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                >
                                    Applications
                                </Button>

                                <Button
                                    className={classes.Text}
                                    fullWidth
                                    variant='contained'
                                >
                                    Certificates
                                </Button>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                </Box>

            </Paper>

            <Box 
                square
                style={{
                    flex:'90%',
                    height: scrH,
                    minHeight: scrH,
                    overflow: 'auto'
                }}
            >
                {action === '' &&
                (
                    <Info />
                )}

                {action === 'AgencyProfile' &&
                (
                    <AgencyProfile />
                )}
                
                {action === 'AgencyUsers' &&
                (
                    <AgencyUsers />
                )}

                {action === 'ClientAgenda' &&
                (
                    <ClientAgenda />
                )}

                {action === 'ClientProfile' &&
                (
                    <ClientProfile />
                )}

                {action === 'ClientApp' &&
                (
                    <ClientApp />
                )}

                {action === 'ClientCoverage' &&
                (
                    <ClientCoverage />
                )}

                {action === 'ClientVehicles' &&
                (
                    <ClientVehicles />
                )}
                
                {action === 'ClientDrivers' &&
                (
                    <ClientDrivers />
                )}
                
                {action === 'ClientPolicies' &&
                (
                    <ClientPolicies />
                )}

                {action === 'ClientDocs' &&
                (
                    <ClientDocs />
                )}

            </Box>

        </Box>
    </>
    );
}
