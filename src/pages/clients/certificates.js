import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PrintIcon from '@material-ui/icons/Print';
import MailIcon from '@material-ui/icons/Mail';

import Modal from '@material-ui/core/Modal';

import { Companies, NewCompany, RemoveCompany,
        Certificates, NewCertificate, NewCertificatePdf,
        SendMail } from '../../controllers/certificates';

import { CertViwer } from '../../controllers/certViwer';
import Searcher from '../../components/search';
import CertNote from '../../components/certNote';

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

export default function ClientCertificate(props) {
    const classes = useStyles();
    const [nav, setNav] = React.useState(0);

    const [loadInfo, isLoad] = React.useState(true);
    const [loadError, didError] = React.useState(false);

    const [isNew, doNew] = React.useState(false);
    const [isAction, doAction] = React.useState(true); //Enables and disbles action buttons on the list
    const [companies, setCompanies] = React.useState([]);
    const [orgCompanies, setOrgCompanies] = React.useState([]);

    const [work, inWork] = React.useState(false);
    const [lastId, setLast] = React.useState(-1);
    const [fileId, setFile] = React.useState(-1);

    const [name, newName] = React.useState('');
    const [street, newStreet] = React.useState('');
    const [city, newCity] = React.useState('');
    const [state, newState] = React.useState('');
    const [zip, newZip] = React.useState('');

    const [history, setHistory] = React.useState([]);
    const [orgHistory, setOrgHistory] = React.useState([]);

    const [viwer, showViwer] = React.useState(false);
    const [file, setFileUrl] = React.useState('');

    const [isMail, doMail] = React.useState(false);
    const [isSend, doSend] = React.useState(false);
    const [mailId, setMailId] = React.useState(-1);
    const [mailTo, setMailTo] = React.useState({
        main: '',
        cc: ''
    });

    const [directId, setDirect] = React.useState(0);
    const [noteModal, showNote] = React.useState(false);
    const [note, setNote] = React.useState('');

    const handleTabs = (event, newValue) =>{
        setNav(newValue);
    }

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoad();
    },[]);

    React.useEffect(() => {
        if(isNew){
            return;
        }

        newName('');
        newStreet('');
        newCity('');
        newState('');
        newZip('');

        if(lastId > 0){
            setLast(-1);
            setFile(-1);
            handleRefresh();
        }

    }, [isNew])

    React.useEffect(() => {
        if(viwer === true){
            return;
        }

        setFileUrl('');
    }, [viwer])

    React.useEffect(() => {
        if(isMail){
            return;
        }

        setMailTo({main:'', cc: ''});
        setMailId(-1);
        doSend(false);
    },[isMail]);

    React.useEffect(() => {
        showNote(directId !== 0);
    }, [directId]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const handleLoad = async() =>{
        try{
            var c = await Companies(props.cid);
        }
        catch(e){
            c = undefined;
        }

        try{
            var crt = await Certificates(props.cid);
        }
        catch(e){
            crt = undefined;
        }

        if(c === undefined || crt === undefined){
            didError(true);
        }

        setCompanies(c);    
        setOrgCompanies(c);
        setHistory(crt);
        setOrgHistory(crt);

        isLoad(false);
    }

    const handleNew = async() =>{
        if(![name, street, city, state, zip].every(Boolean)){
            alert('All parameters are required!');
            return;
        }

        var data = {
            cid: props.cid,
            name: name,
            location: `${street}::${city}::${state}::${zip}`,
        }

        inWork(true);

        try{
            var result = await NewCompany(data);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Somethin went wrong while creating the company. Please, try again');
            inWork(false);
            return;
        }
        setLast(result.id);

        inWork(false);
    }

    const handleNewClose = async() => {
        doNew(false);
        setNote('');
    }

    const handleCertificate = async() => {
        inWork(true);

        try{
            var result = await NewCertificate(lastId, note);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Somethin went wrong while creating the certificate. Please, try again');
            inWork(false);
            return;
        }

        try{
            var rFile = await NewCertificatePdf(result.lid);
        }
        catch(e){
            rFile = undefined;
        }

        if(rFile === undefined){
            alert('Ups... Somethin went wrong while creating the certificate. Please, try again');
            inWork(false);
            return;
        }

        setFile(result.lid);
        setNote('');
        setLast(-1);

        inWork(false);
    }

    const handleNoteCreation = async(id) => {
        setDirect(id);
    }

    const handleNoteCancel = async() => {
        var doIt = await window.confirm('The Certificate will not be created. Do you want to proceed?');

        if(!doIt){
            return;
        }

        handleNoteClearance();
    }

    const handleNoteClearance = async() => {
        setNote('');
        setDirect(0);
    }

    const handleCertificateDirect = async(id, notes) => {
        handleNoteClearance();
        doAction(false);
        try{
            var result = await NewCertificate(id, notes);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Somethin went wrong while creating the certificate. Please, try again');
            doAction(true);
            return;
        }

        try{
            var rFile = await NewCertificatePdf(result.lid);
        }
        catch(e){
            rFile = undefined;
        }

        if(rFile === undefined){
            alert('Ups... Somethin went wrong while creating the certificate PDF. Please, try again');
            doAction(true);
            return;
        }

        doAction(true);
        setNote('');
        handleFile(result.lid);
        handleRefresh();
    }

    const handleFile = async(id) => {
        var url = `https://www.truckinsurancesolutions.org/system/ready_files/certs/cert${id}.pdf`;
        setMailId(id);
        setFileUrl(url);
        showViwer(true);
    }

    const handleRemove = async(id) => {
        var doIt = await window.confirm('The selected Company will be deleted. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        doAction(false);

        var data ={
            id: id
        }

        try{
            var result = await RemoveCompany(data);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Somethin went wrong while removing the company. Please, try again');
            doAction(true);
            return;
        }

        await handleRefresh();
        doAction(true);
    }

    const handleRefresh = async() => {
        try{
            var c = await Companies(props.cid);
        }
        catch(e){
            c = undefined;
        }

        try{
            var crt = await Certificates(props.cid);
        }
        catch(e){
            crt = undefined;
        }

        if(c === undefined || crt === undefined){
            didError(true);
        }

        setCompanies(c);
        setOrgCompanies(c);
        setHistory(crt);
        setOrgHistory(crt);
    }

    const handleMail = async(id) =>{
        if(viwer){
            showViwer(false);
        }

        setMailId(id);
        doMail(true);
    }

    const handleMailSend = async() =>{
        doSend(true);

        try{
            var result = await SendMail(mailId, mailTo.main, mailTo.cc);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while sending the e-mail. Please, try again.');
            return;
        }

        alert('Mail sended successfully!');
        doMail(false);
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
                        CLIENT CERTIFICATES
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
                    <Tab 
                        label="Companies"    
                    />

                    <Tab 
                        label="History"
                    />
                    
                </Tabs>
            </AppBar>

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
                                color: '#3973E5'
                            }}
                        >
                            {!loadError ? 'Loading certificates information...':'Someting whent wrong try again later...'}
                        </Typography>
                    </Box>
                </>
            )}

            {nav === 0 && //Companies Info
            (
                <Container
                    style={{
                        visibility: loadInfo === true ? 'hidden' : 'visible',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Searcher onUpdate={setCompanies} original={orgCompanies} fields={['name', 'licence', 'state']} color='#3973E5'/>

                        <IconButton
                            aria-label="NEW" 
                            style={{
                                color:'#3973E5',
                                fontSize: 15
                            }}

                            onClick={() => doNew(true)}
                        >
                            New Company <AddCircleRoundedIcon fontSize='large'/>
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
                                {field: 'address', headerName: 'ADDRESS', headerClassName: classes.gridHeader, flex: 1},
                                {field: 'city', headerName: 'CITY', headerClassName: classes.gridHeader, flex: 1},
                                {field: 'state', headerName: 'STATE', headerClassName: classes.gridHeader, flex: 1},
                                {field: 'zip', headerName: 'ZIP', headerClassName: classes.gridHeader, flex: 1},
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
                                                    disabled={!isAction}
                                                    aria-label="GENERATE" 
                                                    component="span"
                                                    style={{
                                                        color: isAction ? '#FFFFFF' : '#999999',
                                                        backgroundColor: '#3973E5',
                                                        marginRight: 12
                                                    }}
                                                    onClick={() => handleNoteCreation(params.value)}
                                                >
                                                    <DescriptionIcon />
                                                </IconButton>

                                                <IconButton
                                                    disabled={!isAction}
                                                    aria-label="DELETE" 
                                                    component="span"
                                                    style={{
                                                        color: isAction ? '#FF0000' : '#999999',
                                                        backgroundColor: '#3973E5',
                                                        marginRight: 12
                                                    }}
                                                    onClick={() => handleRemove(params.value)}
                                                >
                                                    <DeleteForeverRoundedIcon />
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
            )}
            
            {nav === 1 && //history Info
            (
                <Container
                    style={{
                        visibility: loadInfo === true ? 'hidden' : 'visible',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: 12,
                        }}
                    >
                        <Searcher onUpdate={setHistory} original={orgHistory} fields={['holder', 'date']} color='#3973E5'/>

                    </Box>

                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid 
                            style={{
                                backgroundColor:'#FF0000'
                            }}
                            columns={[
                                {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                                {field: 'holder', headerName: 'HOLDER/COMPANY NAME', headerClassName: classes.gridHeader, flex: 1},
                                {field: 'date', headerName: 'DATE OF CREATION', headerClassName: classes.gridHeader, flex: .3},
                                {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .2, sortable: false, 
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
                                                    aria-label="COPY" 
                                                    component="span"
                                                    style={{
                                                        color: isAction ? '#FFFFFF' : '#999999',
                                                        backgroundColor: '#3973E5',
                                                        marginRight: 12
                                                    }}
                                                    onClick={() => handleFile(params.value)}
                                                >
                                                    <PrintIcon />
                                                </IconButton>

                                                <IconButton
                                                    disabled={!isAction}
                                                    aria-label="MAIL" 
                                                    component="span"
                                                    style={{
                                                        color: isAction ? '#FFFFFF' : '#999999',
                                                        backgroundColor: '#3973E5',
                                                        marginRight: 12
                                                    }}
                                                    onClick={() => handleMail(params.value)}
                                                >
                                                    <MailIcon />
                                                </IconButton>

                                            </Box>
                                        </>
                                    ),
                                    }
                                ]} 

                            rows={history} 

                            pageSize={7}
                            disableColumnMenu={true}
                        />
                    </div>
                </Container>
            )}

        </Container>

        {/* New Modal */}
        <Modal
            open={isNew}
            onClose={handleNewClose}
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
                            NEW COMPANY
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    style={{
                        margin:8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        HOLDER / COMPANY INFORMATION
                    </Typography>

                    <Divider />
                </Box>

                <TextField 
                    disabled={lastId > 0}
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Name"
                    variant="filled" 
                    value={name}
                    onChange={(e) => newName(e.target.value)}
                />

                <Box
                    style={{
                        margin:8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        HOLDER / COMPANY ADDRESS
                    </Typography>

                    <Divider />
                </Box>

                <TextField 
                    disabled={lastId > 0}
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Street"
                    variant="filled" 
                    value={street}
                    onChange={(e) => newStreet(e.target.value)}
                />

                <TextField 
                    disabled={lastId > 0}
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="City"
                    variant="filled" 
                    value={city}
                    onChange={(e) => newCity(e.target.value)}
                />

                <TextField 
                    disabled={lastId > 0}
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="State"
                    variant="filled" 
                    value={state}
                    onChange={(e) => newState(e.target.value)}
                />

                <TextField 
                    disabled={lastId > 0}
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="ZIP"
                    variant="filled" 
                    value={zip}
                    onChange={(e) => newZip(e.target.value)}
                />

                <Button
                    style={{
                        display: lastId <= 0 && fileId <= 0 ? 'block' : 'none',
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}
                    onClick={handleNew}
                >
                    Register company
                </Button>

                {work && (
                    <Box 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <CircularProgress 
                            style={{
                                color:'#3973E5'
                            }}
                        />
                    </Box>
                )}

                <Box
                    style={{
                        display: lastId > 0 ? 'block' : 'none',
                        margin:8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                            textAlign: 'center',
                        }}
                    >
                        COMPANY REGISTERED SUCCESSFULLY
                    </Typography>

                    <Divider 
                        style={{
                            marginBottom: 8
                        }}
                    />
                    
                    <TextField 
                        label='Optional Note'
                        variant='outlined'
                        fullWidth
                        multiline
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <Button
                        disabled={work}
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            backgroundColor: '#3973E5',
                            color: '#FFFFFF',
                            width: '100%',
                        }}
                        onClick={handleCertificate}
                    >
                        Generate Certificate
                    </Button>

                    

                </Box>

                <Box
                    style={{
                        display: fileId > 0 ? 'block' : 'none',
                        margin:8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                            textAlign: 'center',
                        }}
                    >
                        CERTIFICATE CREATED SUCCESSFULLY
                    </Typography>

                    <Divider />

                    <Button
                        disabled={work}
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            backgroundColor: '#3973E5',
                            color: '#FFFFFF',
                            width: '100%',
                        }}
                        onClick={() => handleFile(fileId)}
                    >
                        Visualize PDF
                    </Button>

                    <Button
                        disabled={work}
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            backgroundColor: '#3973E5',
                            color: '#FFFFFF',
                            width: '100%',
                        }}
                        onClick={() => handleMail(fileId)}
                    >
                        Mail Certificate to Address
                    </Button>

                </Box>

            </Box>
            
        </Modal>  

        <Modal
            open={viwer}
            onClose={() => showViwer(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '15%',
                    width: '70%',
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
                                CERTIFICATE VIWER
                            </Typography>

                            <Box
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'flex-end',
                                    flex:1,
                                }}
                            >
                                <Button
                                    variant='outlined'
                                    style={{
                                        backgroundColor: '#3973E5',
                                        borderRadius: 45,
                                        borderWidth: 2,
                                        borderColor: '#FFFFFF',
                                        color: '#FFFFFF',
                                        marginTop: 8,
                                        marginBottom: 8,
                                    }}
                                    onClick={() => handleMail(mailId)}
                                >
                                    e-Mail File <MailIcon style={{marginLeft:4}}/>
                                </Button>
                            </Box>
                        </Toolbar>
                </AppBar>

                <CertViwer file={file} />
            </Box>

        </Modal>

        {/* Mail Modal */}
        <Modal
            open={isMail}
            onClose={() => doMail(false)}
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
                            CERTIFICATE MAILING
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    style={{
                        margin:8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        RECEIVER E-MAIL
                    </Typography>

                    <Divider />
                </Box>

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="E-Mail"
                    variant="filled" 
                    value={mailTo.main}
                    onChange={(e) => setMailTo({...mailTo,main: e.target.value})}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="CC E-Mail *Optional"
                    variant="filled" 
                    value={mailTo.cc}
                    onChange={(e) => setMailTo({...mailTo,cc: e.target.value})}
                />

                <Button
                    disabled={isSend}
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={handleMailSend}
                >
                    Send Mail
                </Button>

            </Box>
            
        </Modal>  

        {/* Note Modal */}
        <Modal
            open={noteModal}
            onClose={handleNoteCancel}
        >
            <CertNote onCancel={handleNoteCancel} onConfirm={handleCertificateDirect} id={directId}/>
        </Modal>
    </>
);
}
