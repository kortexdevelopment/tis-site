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
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Edit } from '@material-ui/icons';
import SyncIcon from '@material-ui/icons/Sync';
import GroupIcon from '@material-ui/icons/Group';

import * as API from '../../../controllers/corporate';
import Create from './create';
import Users from './users';
import EditCompany from './edit';
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

    const [work, doWork] = React.useState(false);
    const [create, doCreate] = React.useState(false);
    const [usersModal, showUsers] = React.useState(false);

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [companies, setCompanies] = React.useState([]);
    const [original, setOriginal] = React.useState([]);

    const [usersCompany, setCompany] = React.useState('');

    const [edit, showEdit] = React.useState(false);
    const [editCompany, setEdit] = React.useState(undefined);
    React.useEffect(() => {
        !loadInfo || handleLoading();
        showEdit(editCompany !== undefined);
    }, [editCompany]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoading = async() =>{    
        isLoading(false);
        var result = await API.Companies() || false;

        if(!result){
            didError(true);
        }
        else{
            setCompanies(result);
            setOriginal(result);
        }
    }

    const handleCreationClose = async() => {
        var doIt = await window.confirm('The information will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doCreate(false);
    }

    const handleCreationSuccess = async() =>{
        alert('Company created successfully');
        handleLoading();
        doCreate(false);
    }

    const handleStatus = async(id) =>{
        var company = companies.find(e => e.id === id);
        var msg = company.status < 1 ? 'It will be set to Active and will have access to the system' : 'It will be set to Inactive and will not have access to the system';

        var doIt = await window.confirm('Do you want to change the company status?\n' + msg);

        if(!doIt){
            return;
        }

        company.status = company.status < 1 ? 1 : 0;

        var data = new FormData();
        for(const key in company){
            data.append(`${key}`, company[key]);
        }

        doWork(true);

        try{
            var result = await API.UpdateCompany(data);
        }catch(e){
            alert('Error while updating company\'s status. \nPlease, try again');
            doWork(false);
            console.log(e);
            return;
        }

        if(!result.success)
        {
            alert('Error while UPDATING company\'s status. \nPlease, try again');
            doWork(false);
            return;
        }

        alert('Company status updated successfully');
        handleLoading();
    }

    const handleUsers = async(id) =>{
        var company = companies.find(e => e.id === id);
        setCompany(company);
        showUsers(true);
    }

    const handleUsersClose = async() =>{
        setCompany('');
        showUsers(false);
    }

    const handleEditSelect = async(id) => {
        var result = companies.find(x => x.id === id);
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
                        COMPANIES
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
                    REGISTERED COMPANIES
                </Typography>

            </Box>

            <Divider />

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Searcher onUpdate={setCompanies} original={original} fields={['producer', 'company']} color='#777777'/>

                <IconButton
                    aria-label="NEW" 
                    style={{
                        color:'#777777',
                        fontSize: 15
                    }}

                    onClick={() => doCreate(true)}
                >
                    New Company <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'company', headerName: 'NAME', headerClassName: classes.gridHeader, flex: 1.2},
                        {field: 'producer', headerName: 'PRODUCER', headerClassName: classes.gridHeader, flex: 1.2},
                        {field: 'lic_number', headerName: 'LICENCE', headerClassName: classes.gridHeader, flex: .8},
                        {field: 'expiration', headerName: 'EXPIRATION', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'statusTx', headerName: 'STATUS', headerClassName: classes.gridHeader, flex: .5},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .8, sortable: false, 
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
                                            aria-label="USERS" 
                                            component="span"
                                            style={{
                                                color:'#00ff00',
                                                backgroundColor: '#777777',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleUsers(params.value)}
                                        >
                                            <GroupIcon />
                                        </IconButton>

                                        <IconButton
                                            disabled={work}
                                            aria-label="STATUS" 
                                            component="span"
                                            style={{
                                                color:'#0000FF',
                                                backgroundColor: '#777777',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleStatus(params.value)}
                                        >
                                            <SyncIcon />
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

                    rows={companies} 

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
                <EditCompany onCancel={handleEditCancel} onSuccess={handleEditSuccess} company={editCompany}/>
            </Box>
            
        </Modal>        

        <Modal
            open={usersModal}
            onClose={handleUsersClose}
        >
            
            <Box>
                <Users onClose={handleUsersClose} company={usersCompany}/>
            </Box>
            
        </Modal>   

    </>
  );
}
