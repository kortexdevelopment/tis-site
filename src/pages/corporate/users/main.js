import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as API from '../../../controllers/corporate';
import Create from './create';
import Edit from './edit';
import Searcher from '../../../components/search';

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
      backgroundColor:'#777777',
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export function Main(props) {
    const classes = useStyles();
    const session = JSON.parse(window.localStorage.getItem('crpUser'));

    const [boot, didBoot] = React.useState(false);
    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [original, setOriginal] = React.useState([]);

    const [work, doWork] = React.useState(false);
    const [create, doCreate] = React.useState(false);

    const [edit, showEdit] = React.useState(false);
    const [editUser, setEdit] = React.useState(undefined);

    React.useEffect(() => {
        if(boot){
            return;
        }
        didBoot(true);
        handleLoading();
    });

    React.useEffect(() => {
        showEdit(editUser !== undefined);
    }, [editUser]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoading = async() =>{
        try{
            var result = await API.Users();
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

    const handleCreationClose = async() => {
        var doIt = await window.confirm('The information will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doCreate(false);
    }

    const handleCreationSuccess = async() =>{
        handleLoading();
        doCreate(false);
    }

    const handleRemove = async(id) => {
        if(Number(session[0]) === id){
            alert('Operation invalid \nCan not deleted your own user');
            return;
        }

        var doIt = await window.confirm('The information will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var user = users.find(x => x.id === id);

        try{
            var result = await API.UserRemove(user);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while deleting user. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.success){
            handleLoading();
        }
    }

    const handleEditSelect = async(id) => {
        var result = users.find(x => x.id === id);
        setEdit(result);
    }

    const handleEditCancel = async() => {
        var doIt = await window.confirm('The progress will be lost. Do you want to proceed?');

        if(!doIt){
            return;
        }
        setEdit(undefined);
    }

    const handleEditSuccess = async() => {
        handleLoading();
        setEdit(undefined);
    }

  return (
    <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar 
                    variant="dense"
                    style={{
                        backgroundColor:'#777777'
                    }}
                >
                    <Typography variant="h6" color="inherit">
                        USERS
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
                                color:'#777777'
                            }}
                        />
                    )}
                    
                    <Typography 
                        variant="h6"
                        style={{
                            color:'#777777'
                        }}
                    >
                        {!loadError ? 'Loading Companies information...':'Someting whent wrong, try again later...'}
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
                        color:"#777777",
                        flex: 1,
                    }}
                >
                    REGISTERED USERS
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Searcher onUpdate={setUsers} original={original} fields={['name', 'email']} color='#777777'/>
            
                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#777777',
                        fontSize: 15
                    }}

                    onClick={() => doCreate(true)}
                >
                    New User <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1.2},
                        {field: 'email', headerName: 'E-MAIL', headerClassName: classes.gridHeader, flex: 1.2},
                        {field: 'roleLabel', headerName: 'ROLE', headerClassName: classes.gridHeader, flex: .8},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .8, sortable: false, hide: session[4] !== 'admin',
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
                                            disabled={work}
                                            aria-label="STATUS" 
                                            component="span"
                                            style={{
                                                color:'#FF0000',
                                                backgroundColor: '#777777',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleRemove(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>

                                        <IconButton
                                            disabled={work}
                                            aria-label="STATUS" 
                                            component="span"
                                            style={{
                                                color:'#00FF00',
                                                backgroundColor: '#777777',
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
            open={create}
            onClose={handleCreationClose}
        >
            
            <Box>
                <Create onCancel={handleCreationClose} onSuccess={handleCreationSuccess}/>
            </Box>
            
        </Modal>    

        <Modal
            open={edit}
            onClose={handleEditCancel}
        >
            
            <Box>
                <Edit onCancel={handleEditCancel} onSuccess={handleEditSuccess} user={editUser}/>
            </Box>
            
        </Modal>      

    </>
  );
}
