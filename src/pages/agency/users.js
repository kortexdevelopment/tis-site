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

import {Agents, NewAgent, RemoveAgent} from '../../controllers/agencyUsers';
import UsersEdit from './edits/users';
import Searcher from '../../components/search';

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

export default function AgencyUsers() {
    const classes = useStyles();

    const session = JSON.parse(window.localStorage.getItem('session')); //compId userTp
    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [original, setOriginal] = React.useState([]);

    const [newUser, doNew] = React.useState(false);


    const [newName, setName] = React.useState('');
    const [newMail, setMail] = React.useState('');
    const [newPass, setPass] = React.useState('');
    const [newLevel, setLevel] = React.useState('');

    const [deletingId, setDeleting] = React.useState('');

    const [edit, showEdit] = React.useState(false);
    const [editUser, setEdit] = React.useState(undefined);

    const [newPassword, doNewPassword] = React.useState(false);
    const [psswd, setPsswd] = React.useState('');
    const [psswdConfirm, setPsswdConfirm] = React.useState('');

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
    
    React.useEffect(() => {
        showEdit(editUser !== undefined);
    }, [editUser]);

    const handleLoading = async() =>{
        try{
            var results = await Agents(session.compId);
        }
        catch(e){
            results = undefined;
        }

        if(results === undefined){
            didError(true);
            return;
        }

        setOriginal(results);
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
        console.log(`Creating new agent Name:${newName} Mail:${newMail} Pass:${newPass} Level:${newLevel}`);
        
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
            var formResult = await NewAgent(session.compId, newName, newPass, newMail, newLevel);
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
            var results = await Agents(session.compId);
        }
        catch(e){
            results = undefined;
        }

        if(results === undefined){
            return;
        }

        setUsers(results);
        setOriginal(results);
    }

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleEditSelect = async(id) => {
        if(session.userTp !== 2){
            alert('Only Admins can edit agents');
            return;
        }

        var result = users.find(x => x.id === id);
        setEdit(result);
    }

    const handleEditCancel = async() => {
        var doIt = await window.confirm("The progress will be lost. \nDo you want to proceed?");

        if(!doIt){
            return;
        }

        setEdit(undefined);
    }

    const handleEditSuccess = async() => {
        handleRefresh();
        setEdit(undefined);
    }

    const changePassword = async() =>
    {        
        if(psswd !== psswdConfirm)
        {
            alert('Password must match');
            return;
        }
        else
        {
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
        doNewPassword(false);
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
                        AGENCY AGENTS
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
                        color:"#3973E5",
                        flex: 1,
                    }}
                >
                    REGISTERED AGENTS
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Searcher onUpdate={setUsers} original={original} fields={['name', 'mail']} color='#3973E5'/>

                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#3973E5',
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
                        {field: 'pass', headerName: 'ACCESS PASS', headerClassName: classes.gridHeader, flex: 1, renderCell: (params) =>(
                            <>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        style={{
                                            width:"200px",
                                            marginTop: 8,
                                            marginBottom: 8,
                                            marginLeft: 0,
                                            backgroundColor: '#3973E5',
                                            color: '#FFFFFF'
                                        }}

                                        onClick={() => doNewPassword(true)}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </>
                        )},
                        {field: 'levelLabel', headerName: 'ACCESS LEVEL', headerClassName: classes.gridHeader, flex: 1},
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
                                            disabled={session.userId ===  Number(params.value) ? true : false}
                                            style={{
                                                color: session.userId ===  Number(params.value) ? '#FFFFFF' : '#FF0000',
                                                backgroundColor: session.userId ===  Number(params.value) ? '#A5C0F3' : '#3973E5' ,
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

                                        <IconButton
                                            aria-label="EDIT" 
                                            component="span"
                                            style={{
                                                color:'#73E600',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleEditSelect(params.value)}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>

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
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createUser}
                >
                    Create User
                </Button>
            </Box>
            
        </Modal>  

        <Modal
            open={edit}
            onClose={handleEditCancel}
        >
            <UsersEdit onCancel={handleEditCancel} onSuccess={handleEditSuccess} user={editUser} />
        </Modal>      
        <Modal
                    open={newPassword}
                    onClose={() => {
                        doNewPassword(false);
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
  );
}
