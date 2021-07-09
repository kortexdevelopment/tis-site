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

import { Agents, Vendors, Templates,
        CreateLink, CreateData, CreatePdf } from '../../controllers/applications';
import { applicationAgents } from '../../lib/api';

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

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    
    const [agents, setAgents] = React.useState([]);
    const [idAgent, setIdAgent] = React.useState(0);

    const [vendors, setVendors] = React.useState([]);
    const [idVendor, setIdVendor] = React.useState(0);

    const [templates, setTemplates] = React.useState([]);
    const [idTemplate, setIdTemplate] = React.useState(0);

    const [Application, setApplication] = React.useState({
        id: 0,
        files: 0,
    });

    const [aviable, setAviable] = React.useState({
        liability: false,
        cargo: false,
        general: false,
        tractor: false,
        trailer: false,
        non: false,
        interchange: false,
    });

    const [covers, setCovers] = React.useState({
        liability: false,
        cargo: false,
        general: false,
        tractor: false,
        trailer: false,
        non: false,
        interchange: false,
    });

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }

        handleLoad();
    })

    React.useEffect(() => {
        if(idAgent === 0){
            return;
        }

        handleVendor();
    }, [idAgent])

    React.useEffect(() => {
        if(idVendor === 0){
            return;
        }
        handleTemplate();
    }, [idVendor])

    React.useEffect(() => {
        if(idTemplate === 0){
            
            covers.liability = false;
            covers.cargo = false;
            covers.general = false;
            covers.tractor = false;
            covers.trailer = false;
            covers.non = false;
            covers.interchange = false;

            setCovers(covers);

            return;
        }

        handleCoverages();
    }, [idTemplate])

    React.useEffect(() => {
        switch(activeStep){
            case 0:
                setIdAgent(0);
                break;
            case 1:
                setIdVendor(0);
                break;
            case 2:
                setIdTemplate(0);
                break;
        }
    }, [activeStep]);

    const handleSelect = async(id) =>{
        switch(activeStep){
            case 0:
                setIdAgent(id);
                break;
            case 1:
                setIdVendor(id);
                break;
            case 2:
                setIdTemplate(id);
                break;
            case 4:
        	    isLoading(false);
                break;
        }
    }

    const handleReturn = async() =>{
        setActiveStep(activeStep - 1);
        didError(false);
    }

    const handleLoad = async() => {
        try{
            var result = await Agents();
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setAgents(result);
        isLoading(false);
    }

    const handleVendor = async() =>{
        isLoading(true);

        try{
            var result = await Vendors(idAgent);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setVendors(result);
        setActiveStep(1);
        isLoading(false);
    }

    const handleTemplate = async() => {
        isLoading(true);

        try{
            var result = await Templates(idAgent, idVendor);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setTemplates(result);
        setActiveStep(2);
        isLoading(false);
    }

    const handleCoverages = async() =>{
        isLoading(true);
        var template = { ...templates.find(x => x.id === idTemplate)};
        var covers = template.covers;

        aviable.liability = !covers.includes('1');
        aviable.cargo = !covers.includes('2');
        aviable.general = !covers.includes('3');
        aviable.tractor = !covers.includes('4');
        aviable.trailer = !covers.includes('5');
        aviable.non = !covers.includes('6');
        aviable.interchange = !covers.includes('7');

        setAviable(aviable);
        setActiveStep(3);
        isLoading(false);
    }

    const handleCoverChange = (e) => {
        setCovers({...covers, [e.target.name]: e.target.checked});
    }

    const handleCreation = async() => {
        console.log(`Agent:${idAgent} Vendor:${idVendor} Template:${idTemplate} Covers:`);
        console.log(covers);
        
        //Verificar que tenga al menos una covertura
        //Solo verificar las que esta dispobibles
        var _coversAv = []
        var _coversIndex = ['', 'liability', 'cargo', 'general', 'tractor', 'trailer', 'non', 'interchange'];
        var _coversArray = [];

        var _pass = false;
        
        for(const prop in aviable){
            if(aviable[prop] === false){
                _coversAv.push(covers[prop]);
            }
        }

        if(_coversAv.some(Boolean)){
            _pass = true;
        }

        if(_pass === false){
            alert('Must select at least one coverge from the aviable options');
            return;
        }

        for(const prop in covers){
            if(covers[prop] === true){
                _coversArray.push(_coversIndex.indexOf(prop));
            }
        }

        //Generar usando el CreateLink cid aid vid link covers
        isLoading(true);

        var linkData = {
            cid: props.cid,
            aid: idAgent,
            vid: idVendor,
            lid: idTemplate,
            covers: _coversArray,
        }

        try{
            var linkCreated = await CreateLink(linkData);
        }
        catch(e){
            linkCreated = undefined;
        }

        if(linkCreated === undefined){
            didError(true);
            return;
        }

        var dataData = {
            id: linkCreated.id,
        }

        try{
            var dataCreated = await CreateData(dataData);
        }
        catch(e){
            dataCreated = undefined;
        }

        if(dataCreated === undefined){
            didError(true);
            return;
        }

        var dataArray = await dataToArray(dataCreated.data);

        //postear la creacion del pdf al CreatePPDF en un ciclo con los files que ocupa.
        for(var i = 0; i < dataCreated.files.length; i++){
            var fileData = {
                file: dataCreated.files[i],
                data: dataArray,
                saved: `app_${linkCreated.id}_${(i + 1)}.pdf`,
            }

            try{
                var _ = await CreatePdf(fileData);
            }
            catch(e){}
        }

        Application.id = linkCreated.id;
        Application.files = dataCreated.files.length;

        setApplication(Application);
        setActiveStep(4);
    }

    const dataToArray = async(data) => {
        var result = [];
        for(const prop in data){
            result.push(`${prop}|${data[prop]}`);
        }

        return result;
    }

    const handleFiles = async() => {
        for(var i = 0; i < Application.files; i++)
        {
            var file = `app_${Application.id}_${(i + 1)}.pdf`;
            var url = `https://www.truckinsurancesolutions.org/system/ready_files/${file}`;
            window.open(url, '_blank');
        }
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

            <Box
                style={{
                    display: activeStep === 0 ? 'none' : 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: 12,
                }}
            >
                <Button
                    style={{
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}
                    onClick={handleReturn}
                >
                    STEP BACK
                </Button>
            </Box>
                
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
                                                    color:'#FFFFFF',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                                onClick={() => handleSelect(params.value)}
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
                                                    color:'#FFFFFF',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                                onClick={() => handleSelect(params.value)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                ),
                                }
                            ]} 

                        rows={vendors} 

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
                            {field: 'name', headerName: 'NAME', headerClassName: classes.gridHeader, flex: .3},
                            {field: 'coversTxt', headerName: 'COVERAGES', headerClassName: classes.gridHeader, flex: 1},
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
                                                    color:'#FFFFFF',
                                                    backgroundColor: '#3973E5',
                                                    marginRight: 12
                                                }}
                                                onClick={() => handleSelect(params.value)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                ),
                                }
                            ]} 

                        rows={templates} 

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
                                disabled={aviable.liability}
                                name="liability"
                                color="primary"
                                checked={covers.liability}
                                onChange={handleCoverChange}
                            />
                            }
                            label="Liability"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                disabled={aviable.cargo}
                                name="cargo"
                                color="primary"
                                checked={covers.cargo}
                                onChange={handleCoverChange}
                            />
                            }
                            label="Cargo"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                disabled={aviable.general}
                                name="general"
                                color="primary"
                                checked={covers.general}
                                onChange={handleCoverChange}
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
                                disabled={aviable.tractor}
                                name="tractor"
                                color="primary"
                                checked={covers.tractor}
                                onChange={handleCoverChange}
                            />
                            }
                            label="Tactor"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                disabled={aviable.trailer}
                                name="trailer"
                                color="primary"
                                checked={covers.trailer}
                                onChange={handleCoverChange}
                            />
                            }
                            label="Trailer"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                disabled={aviable.non}
                                name="non"
                                color="primary"
                                checked={covers.non}
                                onChange={handleCoverChange}
                            />
                            }
                            label="T. Non-owned"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                disabled={aviable.interchange}
                                name="interchange"
                                color="primary"
                                checked={covers.interchange}
                                onChange={handleCoverChange}
                            />
                            }
                            label="T. Interchage"
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
                            onClick={handleCreation}
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
                            onClick={handleFiles}
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
