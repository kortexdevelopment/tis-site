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

import logo from '../../media/logo.png';

import Info from './info';

import {Main as Companies} from './companies/main';

// 3973E5 primary
// 9E9E9E secondary
// FF0000 red


const useStyles = makeStyles((theme) => ({
    Main: {
        backgroundColor:'#3D3D3D',
    },
    MainText: {
        color:'#FFFFFF',
    },
    Sub: {
        backgroundColor:'#9E9E9E',
    },
    Text: {
        color:'#3D3D3D',
        marginTop: 5,
    },
    Box:{
        display:'flex',     
        flexDirection:'column',
        width: '100%',
    },
}));

export function Main() {

    const scrH = window.innerHeight;
    const scrW = window.innerWidth;

    const classes = useStyles();
    let history = useHistory();

    const [panel, SetPanel] = React.useState(0);
    const [component, setComponent] = React.useState(<Info />);

    const handlePanels = (panel) => (event, isExpanded) => {
        SetPanel(isExpanded ? panel : false);
    }

    const handleDirectPanel = async(panel) =>{
        SetPanel(panel);
    }

    const handleLogout = async() =>{
        var doIt = await window.confirm('Loging Out. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        window.localStorage.removeItem('crpUser');
        history.push("/corporate");
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
                    backgroundColor: '#777777',
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
                                Corporation
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
                                >
                                    Users
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
                                Companies
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
                                    onClick={() => setComponent(<Companies />)}
                                >
                                    Manage
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
                {component}
            </Box>

        </Box>
    </>
    );
}
