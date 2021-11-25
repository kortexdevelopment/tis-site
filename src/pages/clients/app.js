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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { AppUsers, NewAppUser, RemoveAppUser } from '../../controllers/app';
import AppUserEdit from './edits/app';
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

export default function ClientApp(props) {
    const classes = useStyles();
    const session = JSON.parse(window.localStorage.getItem('session'));

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [original, setOriginal] = React.useState([]);
    const [appUsers, setUsers] = React.useState([]);

    const [newUser, doNew] = React.useState(false);
    const [newName, setName] = React.useState('');
    const [newPass, setPass] = React.useState('');

    const [delId, setDel] = React.useState(0);
    
    const [edit, showEdit] = React.useState(false);
    const [editUser, setEdit] = React.useState(undefined);

    const [newPassword, doNewPassword] = React.useState(false);
    const [psswd, setPsswd] = React.useState('');
    const [psswdConfirm, setPsswdConfirm] = React.useState('');
    const [which, setPsswdWhich] = React.useState('');

    //Add app user buslhit logic
    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoading();
    })
    
    React.useEffect(() => {
        if(newUser === false)
        {
            clearInputs();
        }
    }, [newUser]);

    React.useEffect(() => {
        showEdit(editUser !== undefined);
    }, [editUser]);

    const handleLoading = async() => {
        try{
            var result = await AppUsers(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setUsers(result);
        setOriginal(result);
        isLoading(false);
    }

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const createCredential = async() => {

        const re = /@/;

        if(![newName, newPass].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        if(re.test(newName)){
            alert('Just enter the user name at NAME field, the system will asign the domain');
            return;
        }

        try{
            var result = await NewAppUser(props.cid, newName, newPass);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while creating this credential. Please, try again.');
            return;
        }

        handleRefresh();
        clearInputs();
    }

    const removeCredential = async(uid) => {
        var doIt = await window.confirm('The selected App credentials will be deleted. \nDo you want to proceed?');

        if(!doIt){
            return;
        }
        
        setDel(uid);

        try{
            var result = await RemoveAppUser(uid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went worng while removing the credential. Please, try again');
            setDel(0);
            return;
        }

        alert('Credential removed successfully!');
        setDel(0);
        handleRefresh();
    }

    const clearInputs = async() => {
        setName('');
        setPass('');
        doNew(false);
    }

    const handleRefresh = async() =>{
        try{
            var result = await AppUsers(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            return;
        }

        setUsers(result);
    }

    const handelEditSelect = async(id) => { 
        var result = appUsers.find(x => x.id === id);
        setEdit(result);
    }

    const handleEditCancel = async() => {
        var doIt = await window.confirm('The progress will be lost. \nDo you want to proceed?');

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
        console.log(which);
        if(psswd !== psswdConfirm)
        {
            alert('Password must match');
            return;
        }
        else
        {
            try{
                var result = await API.changePasswdApp(psswd, which);
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
        setPsswdWhich('');
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
                        MOBILE APP
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
                        {!loadError ? 'Loading App Access information...':'Someting whent wrong, try again later...'}
                    </Typography>
                </Box>
            </>
        )}

        <Container
            className={classes.containerRoot}
            style={{
                visibility: loadInfo === true ? 'hidden' : 'visible',
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
                    REGISTERED CREDENTIALS
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Searcher onUpdate={setUsers} original={original} fields={['user']} color='#3973E5'/>

                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#3973E5',
                        fontSize: 15
                    }}

                    onClick={() => doNew(true)}
                >
                    New Credential <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'userLabel', headerName: 'ACCESS CREDENTIAL', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'pass', headerName: 'ACCESS PASSWORD', headerClassName: classes.gridHeader, flex: 1,
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
                                    <Button
                                        style={{
                                            width:"200px",
                                            marginTop: 8,
                                            marginBottom: 8,
                                            marginLeft: 0,
                                            backgroundColor: '#3973E5',
                                            color: '#FFFFFF'
                                        }}

                                        onClick={() => {doNewPassword(true); setPsswdWhich(params.value);} }
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </>
                        )},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: 1, sortable: false, 
                            valueGetter: idGetter,
                            renderCell: (params) =>(
                                <>
                                    <Box
                                        style={{
                                            display: delId !== Number(params.value) ? 'flex': 'none',
                                            justifyContent: 'space-evenly',
                                            width: '100%',
                                        }}
                                    >
                                        <IconButton
                                            aria-label="DELETE" 
                                            component="span"
                                            style={{
                                                color:'#FF0000',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => removeCredential(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="DELETE" 
                                            component="span"
                                            style={{
                                                color:'#00FF00',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => handelEditSelect(params.value)}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={appUsers} 
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
                            NEW CREDENTIAL
                        </Typography>
                    </Toolbar>
                </AppBar>
            
                <FormControl>
                    <TextField 
                        style={{
                            marginTop: 8,
                            marginLeft: 15,
                            marginRight: 15,
                        }}
                        label="Credential Name"
                        variant="filled" 
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText style={{color:"#3973E5", marginLeft:15}}>
                        Just enter a name. The @domain.dot will be assigned by the system
                    </FormHelperText>
                </FormControl>

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Credential Password"
                    variant="filled" 
                    value={newPass}
                    onChange={(e) => setPass(e.target.value)}
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

                    onClick={createCredential}
                >
                    Create Creadential
                </Button>
            </Box>
            
        </Modal>        

        <Modal
            open={edit}
            onClose={handleEditCancel}
        >
            <AppUserEdit onCancel={handleEditCancel} onSuccess={handleEditSuccess} user={editUser} />

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
