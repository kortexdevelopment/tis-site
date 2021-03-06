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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {Agents, NewAgent, RemoveAgent} from '../../../controllers/agency';

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
    paddingBottom: 25,
    flexDirection: 'column',
    overflow: 'scrollable',
    backgroundColor: '#FFFFFF'
  },
  grid: {

  },
  gridHeader: {
      color:'#FFFFFF',
      backgroundColor:'#777777',
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function Users(props) {
    const classes = useStyles();

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    const [newUser, doNew] = React.useState(false);
    const [newName, setName] = React.useState('');
    const [newMail, setMail] = React.useState('');
    const [newPass, setPass] = React.useState('');
    const [newLevel, setLevel] = React.useState('');

    const [deletingId, setDeleting] = React.useState('');

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoading();
    }, []);

    React.useEffect(() => {
        if(newUser === false)
        {
            clearForm();
        }
    }, [newUser]);

    const handleLoading = async() =>{
        try{
            var results = await Agents(props.company.id);
        }
        catch(e){
            results = undefined;
        }

        if(results === undefined){
            didError(true);
            return;
        }

        setUsers(results);
        isLoading(false);
    }

    const handleRemove = async(id) =>{
        var doIt = await window.confirm("The selected Agent will be deleted. \nDo you want to proceed?");

        if(!doIt){
            return;
        }

        setDeleting(id);

        try{
            var results = await RemoveAgent(id);
        }
        catch(e){
            alert("Something went wrong while removing the agent, please try again.");
            setDeleting('');

            return;
        }

        handleRefresh();
    }

    const createUser = async() =>
    {
        
        if(![newName, newMail, newPass, newLevel].every(Boolean))
        {
            alert('All parameters are required');
            return;
        }

        if(!validEmail(newMail)){
            alert('E-mail format its not valid, please verify information');
            return;
        }

        try{
            var formResult = await NewAgent(props.company.id, newName, newPass, newMail, newLevel);
        }
        catch(e){
            formResult = undefined;
        }

        if(formResult === undefined){
            alert(`Something went wrong while creating this agent, please try again`);
            return;
        }

        handleRefresh();

        doNew(false);
    }

    const validEmail = (mail) =>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const clearForm = async() =>{
        setName('');
        setMail('');
        setPass('');
        setLevel('');
    }

    const handleRefresh = async() =>{
        try{
            var results = await Agents(props.company.id);
        }
        catch(e){
            results = undefined;
        }

        if(results === undefined){
            return;
        }

        setUsers(results);
    }

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

  return (
    <>
        <Container
            className={classes.containerRoot}
            style={{
                visibility: loadInfo ===  true ? 'hidden' : 'visible',
            }}
        >

            <Box>

                <Typography 
                    variant='h6'
                    style={{
                        color:"#3d3d3d",
                        flex: 1,
                    }}
                >
                    COMPANY AGENTS
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
                        color:'#777777',
                        fontSize: 15
                    }}

                    onClick={() => doNew(true)}
                >
                    New Agent <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'mail', headerName: 'ACCESS E-MAIL', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'pass', headerName: 'ACCESS PASS', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'level', headerName: 'ACCESS LEVEL', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: 1, sortable: false,
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
                                            aria-label="DELETE" 
                                            component="span"
                                            style={{
                                                color: '#FF0000',
                                                backgroundColor: '#777777' ,
                                                marginRight: 12,
                                                visibility: deletingId ===  params.value ? 'hidden' : 'visible',
                                                display: deletingId ===  params.value ? 'none' : 'block',
                                            }}
                                            onClick={() => handleRemove(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>

                                        <CircularProgress 
                                            style={{
                                                color:'#3973E5',
                                                visibility: deletingId ===  params.value ? 'visible' : 'hidden',
                                                display: deletingId ===  params.value ? 'block' : 'none',
                                            }}
                                        />

                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                        rows={users}
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
                    top: '10%',
                    left: '30%',
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
                            backgroundColor:'#3d3d3d'
                        }}
                    >
                        <Typography variant="h6" color="inherit">
                            NEW AGENT
                        </Typography>
                    </Toolbar>
                </AppBar>
            
                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Agent Name"
                    variant="filled" 
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="E-Mail"
                    variant="filled"
                    value={newMail}
                    onChange={(e) => setMail(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Password"
                    variant="filled"
                    value={newPass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <FormControl 
                    variant="filled"
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <InputLabel id="levelLabel">Access Level</InputLabel>
                    <Select
                        labelId="levelLabel"
                        value={newLevel}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <MenuItem value="">Select one option</MenuItem>
                        <MenuItem value={2}>Admin</MenuItem>
                        <MenuItem value={1}>Normal</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3d3d3d',
                        color: '#FFFFFF'
                    }}

                    onClick={createUser}
                >
                    Create User
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
