import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Coverages, NewCoverages, UpdateCoverages } from '../../controllers/client';

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
  selectControl: {
      flex:1,
  },
  textSingned: {
      flex:1,
      marginRight: 8,
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function ClientCoverage(props) {
    const classes = useStyles();
    const [ded, setDed] = React.useState(-1);

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [coverages, setCoverages] = React.useState(undefined);
    const [vCargo, setCargo] = React.useState('');
    const [vGeneral, setGeneral] = React.useState('');

    const [edit, canEdit] = React.useState(false);

    React.useEffect(() =>{
        if(!loadInfo){
            return;
        }

        handleLoading();
    });

    const handleLoading = async() => {
        try{
            var result = await Coverages(props.cid)
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setCoverages(result);
        isLoading(false);
    }

    const handleCoverage = async() => {
        if(coverages.vLiability === -1){
            alert('Must select an option for Libility Value');
            return;
        }

        if(coverages.dLiability === -1){
            alert('Must select an option for Libility Deductible');
            return;
        }

        if(coverages.dCargo === -1){
            alert('Must select an option for Cargo Deductible');
            return;
        }

        if(coverages.dGeneral === -1){
            alert('Must select an option for Gral. Liability Deductible');
            return;
        }

        if(coverages.update === true){
            updateCoverages();
        }
        else{
            createCoverages();
        }
    }

    const createCoverages = async() => {
        var copy = {...coverages, cid: props.cid};

        try{
            var result = await NewCoverages(copy);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while updating the coverages. Please, try again');
            return;
        }

        alert('Coverages updated successfully!');
        canEdit(false);
    }

    const updateCoverages = async() => {
        try{
            var result = await UpdateCoverages(coverages);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while updating the coverages. Please, try again');
            return;
        }

        alert('Coverages updated successfully!');
        canEdit(false);
    }

    const handleChanges = async(e) =>{
        setCoverages({...coverages, [e.target.name]: e.target.value})
    }

    const filterChanges = async(e) =>{

    }

    const consoleDebug = async() => {
        console.log(coverages);
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
                        CLIENT COVERAGES
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
                        {!loadError ? 'Loading Coverages information...':'Someting whent wrong, try again later...'}
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
            
            <AppBar 
                position="static"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#3973E5',
                    alignItems: 'center',
                    paddingLeft: 12,
                }}
            >
                
                <Typography variant='h6'color="inherit">
                    REGISTERED COVERAGES
                </Typography>

                <Box
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#3973E5',
                    }}
                >
                    <Typography color="inherit">
                        Edit Coverages
                    </Typography>
                    <Switch
                        color='secondary'
                        value={edit}
                        checked={edit}
                        onChange={(e) => canEdit(e.target.checked)}
                    />
                    <IconButton
                        style={{
                            color: '#FFFFFF'
                        }}
                        onClick={handleCoverage}
                    >
                        <SaveIcon 
                        />
                    </IconButton>
                </Box>
            </AppBar>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    style={{
                        paddingTop:8
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        Liability
                    </Typography>

                    <Divider />
                </Box>

            
                <Box
                    style={{
                        flex:'100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom:15,
                    }}  
                >
                    <FormControl className={classes.textSingned}>
                        <InputLabel id="title">Value </InputLabel>
                        <Select
                            disabled={!edit}
                            labelId="title"
                            name="vLiability"
                            value={coverages === undefined ? -1 : coverages.vLiability}
                            onChange={handleChanges}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={750000}>$750,000</MenuItem>
                            <MenuItem value={1000000}>$1,000,000</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            disabled={!edit}
                            labelId="title"
                            name='dLiability'
                            value={coverages === undefined ? -1 : coverages.dLiability}
                            onChange={handleChanges}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1000}>$1,000</MenuItem>
                            <MenuItem value={2500}>$2,500</MenuItem>
                            <MenuItem value={5000}>$5,000</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    style={{
                        paddingTop:8
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        Cargo
                    </Typography>

                    <Divider />
                </Box>

            
                <Box
                    style={{
                        flex:'100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom:15,
                    }}  
                >
                    <FormControl fullWidth className={classes.textSingned}>
                        <InputLabel htmlFor="value">Value</InputLabel>
                        {edit && (
                            <Input
                                id="value"
                                type='number'
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                name='vCargo'
                                value={coverages === undefined ? -1 : coverages.vCargo}
                                onChange={handleChanges}
                            />
                        )}
                        
                        {!edit && (
                            <Input
                                disabled={true}
                                id="value"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                name='vCargo'
                                value={coverages === undefined ? -1 : 
                                        new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(coverages.vCargo))}
                            />
                        )}
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            disabled={!edit}
                            labelId="title"
                            displayEmpty
                            name='dCargo'
                            value={coverages === undefined ? -1 : coverages.dCargo}
                            onChange={handleChanges}
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1000}>$1,000</MenuItem>
                            <MenuItem value={2500}>$2,500</MenuItem>
                            <MenuItem value={5000}>$5,000</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    style={{
                        paddingTop:8
                    }}
                >
                    <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        General Liability
                    </Typography>

                    <Divider />
                </Box>

            
                <Box
                    style={{
                        flex:'100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom:15,
                    }}  
                >
                    <FormControl fullWidth className={classes.textSingned}>
                        <InputLabel htmlFor="value">Value</InputLabel>
                        {edit && (
                            <Input
                                id="value"
                                type='number'
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                name='vGeneral'
                                value={coverages === undefined ? -1 : coverages.vGeneral}
                                onChange={handleChanges}
                            />
                        )}
                        
                        {!edit && (
                            <Input
                                disabled={true}
                                id="value"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                name='vGeneral'
                                value={coverages === undefined ? -1 : 
                                        new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(coverages.vGeneral))}
                            />
                        )}
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            disabled={!edit}
                            labelId="title"
                            displayEmpty
                            name='dGeneral'
                            value={coverages === undefined ? -1 : coverages.dGeneral}
                            onChange={handleChanges}
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1000}>$1,000</MenuItem>
                            <MenuItem value={2500}>$2,500</MenuItem>
                            <MenuItem value={5000}>$5,000</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

            </Box>

        </Container>

    </>
);
}
