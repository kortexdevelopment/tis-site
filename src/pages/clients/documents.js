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
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Upload, List, Delete, Download } from '../../controllers/documents';
import { saveAs } from 'file-saver';

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

export default function ClientDocs(props) {
    const classes = useStyles();

    const [newUser, doNew] = React.useState(false);
    const [upload, onUpload] = React.useState(false);
    const [file, setFile] = React.useState('');
    const [name, setName] = React.useState('');
    const [client, setClient] = React.useState(false);

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoad();
    });

    React.useEffect(() => {
        if(newUser === false)
        {
            setClient(false);
            setName('');
            setFile('');
        }
    }, [newUser]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoad = async() =>{
        try{
            var result = await List(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setDocuments(result);
        isLoading(false);
    }

    const uploadFile = async() =>
    {
        if(![name, file].every(Boolean)){
            alert('All parameters are required. Please, verify information');
            return;
        }

        var data = new FormData();

        data.append('file', file);
        data.append('cid', props.cid);
        data.append('name', name);
        data.append('type', client === true ? 1 : 0);

        onUpload(true);

        try{
            var result = await Upload(data);
        }
        catch(e){
            alert('Ups... Something went wrong while uploading the file. Please, try again');
            onUpload(false);
            return
        }

        alert('File uploaded successfully!');
        onUpload(false);
        doNew(false);
        handleRefresh();
    }

    const handleDelete = async(id) => {
        var doIt = await window.confirm('The selected Document will be deleted from the cloud. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var doc = documents.find(x => x.id === id);

        var data = new FormData();

        data.append('id', doc.id);
        data.append('name', doc.file);

        try{
            var result = await Delete(data);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while uploading the file. Please, try again');
            return;
        }

        alert('File deleted successfully!');
        handleRefresh();
    }

    const handleRefresh = async() =>{
        try{
            var result = await List(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setDocuments(result);
    }

    const handleDownload = async(id) => {
        var doc = documents.find(x => x.id === id);
        var url = `https://truckinsurancesolutions.org/system/ready_files/${doc.file}`;
        var ext = doc.file.split('.')[1];
        saveAs(url, `${doc.name}.${ext}`);
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
                        CLIENT DOCUMENTS
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
                        {!loadError ? 'Loading Cloud information...':'Someting whent wrong, try again later...'}
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
                    CLOUD DOCUMENTS
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
                        color:'#3973E5',
                        fontSize: 15
                    }}

                    onClick={() => doNew(true)}
                >
                    Upload File <AddCircleRoundedIcon fontSize='large'/>
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
                        {field: 'type', headerName: 'CLIENT APP', headerClassName: classes.gridHeader, flex: .3},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .3, sortable: false, 
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
                                                color:'#FF0000',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleDelete(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>

                                        <IconButton
                                            aria-label="DOWNLOAD" 
                                            component="span"
                                            style={{
                                                color:'#73E600',
                                                backgroundColor: '#3973E5',
                                                marginRight: 12
                                            }}
                                            onClick={() => handleDownload(params.value)}
                                        >
                                            <GetAppIcon />
                                        </IconButton>

                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={documents} 

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
                    left: '35%',
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
                            FILE UPLOAD
                        </Typography>
                    </Toolbar>
                </AppBar>

                <input
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{
                        display: 'none',
                    }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label 
                    htmlFor="contained-button-file"
                >
                    <Button 
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: '25%',
                            marginRight: '25%',
                            backgroundColor: file === '' ? '#EE0000' : '#43E900',
                            color: '#FFFFFF',
                            width: '50%',
                            fontWeight: 'bold',
                        }}
                        component="span"
                    >
                        {file === '' ? 'SELECT FILE' : 'FILE SELECTED'}
                    </Button>
                </label>

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="File Description"
                    variant="filled" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormControl 
                    variant="filled"
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <FormControlLabel
                        control={<Switch checked={client} onChange={(e) => setClient(e.target.checked)} color='primary'/>}
                        label="Aviable to Client in App"
                    />
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

                    onClick={uploadFile}
                >
                    Upload File
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
