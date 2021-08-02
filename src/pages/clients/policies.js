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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Policies, NewPolicy, RemovePolicy } from '../../controllers/client';

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

export default function ClientPolicies(props) {
    const classes = useStyles();

    const [newUser, doNew] = React.useState(false);

    const [loadInfo, isLoading] = React.useState(true);
    const [loadError, didError] = React.useState(false);
    const [policies, setPolicies] = React.useState([]);

    const [newName, setName] = React.useState('');
    const [newNaic, setNaic] = React.useState('');
    const [newNumber, setNumber] = React.useState('');
    const [newFrom, setFrom] = React.useState('');
    const [newTo, setTo] = React.useState('');
    const [covers, setCover] = React.useState({
        liability: false,
        cargo: false,
        general: false,
        damage: false,
        interchange: false,
        non: false,
        unisured: false,
    });

    const [aviable, setAviable] = React.useState({
        liability: true,
        cargo: true,
        general: true,
        damage: true,
        interchange: true,
        non: true,
        unisured: true,
    });

    const {liability, cargo, general, damage, interchange, non, unisured} = covers;

    React.useEffect(() => {
        if(!loadInfo){
            return;
        }
        
        handleLoading();
    });

    React.useEffect(() => {
        if(newUser === false)
        {
            clearInput();
        }
    }, [newUser]);

    React.useEffect(() =>{
        handleAviable();
    }, [policies]);

    const idGetter = (params) =>{
        return params.getValue(params.id, 'id');
    }

    const coversHandler = (event) => {
        setCover({ ...covers, [event.target.name]: event.target.checked});
    }

    const handleLoading = async() => {
        try{
            var result = await Policies(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setPolicies(result);
        isLoading(false);
    }

    const createPolicy = async() => {
        if(![newName, newNumber, newNaic, newFrom, newTo].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        var clearCovers = '';
        var hasLeast = false;

        if(liability === true){
            clearCovers+= 'Liability,';
            hasLeast = true;
        }
        
        if(cargo === true){
            clearCovers+= 'Cargo,';
            hasLeast = true;
        }

        if(general === true){
            clearCovers+= 'Gral. Liability,';
            hasLeast = true;
        }

        if(damage === true){
            clearCovers+= 'P.Damage,';
            hasLeast = true;
        }

        if(interchange === true){
            clearCovers+= 'Trailer Interchange,';
            hasLeast = true;
        }

        if(non === true){
            clearCovers+= 'Non owned Trailer,';
            hasLeast = true;
        }

        if(unisured === true){
            clearCovers+= 'Unisured Motorist';
            hasLeast = true;
        }

        if(hasLeast === false){
            alert('Must select at least one option for COVERAGE');
            return;
        }

        var policy = {
            cid: props.cid,
            name: newName,
            number: newNumber,
            naic: newNaic,
            from: newFrom,
            to: newTo,
            covers: clearCovers,
        }

        console.log(policy);

        try{
            var result = await NewPolicy(policy);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while creating the policy. Please, try again');
            return;
        }

        alert('Policy created successfully!');

        handleRefresh();
        doNew(false);
    }

    const removePolicy = async(id) => {
        var doIt = await window.confirm('The selected Policy will be deleted. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var policy = {
            id: id,
        }

        try{
            var result = await RemovePolicy(policy);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Ups... Something went wrong while removing the policy. Please, try again');
            return;
        }

        alert('Policy removed successfully!');
        handleRefresh();
    }

    const handleRefresh = async() => {
        try{
            var result = await Policies(props.cid);
        }
        catch(e){
            result = undefined;
        }

        if(result === undefined){
            didError(true);
            return;
        }

        setPolicies(result);
    }

    const clearInput = async() => {
        setName('');
        setNaic('');
        setNumber('');
        setFrom('');
        setTo('');
        setCover({
            liability: false,
            cargo: false,
            general: false,
            damage: false,
            interchange: false,
            non: false,
            unisured: false,
        });
    }

    const handleAviable = async() =>{
        var isAviable = {
            liability: true,
            cargo: true,
            general: true,
            damage: true,
            interchange: true,
            non: true,
            unisured: true,
        };

        for(var a = 0; a < policies.length; a++)    
        {
            var cover = policies[a].covers;

            if(isAviable.liability === true){
                isAviable.liability = !cover.includes('Liability');
            }
            if(isAviable.cargo === true){
                isAviable.cargo = !cover.includes('Cargo');
            }
            if(isAviable.general === true){
                isAviable.general = !cover.includes('Gral. Liability');
            }
            if(isAviable.damage === true){
                isAviable.damage = !cover.includes('Damage');
            }
            if(isAviable.interchange === true){
                isAviable.interchange = !cover.includes('Trailer Interchange');
            }
            if(isAviable.non === true){
                isAviable.non = !cover.includes('Non Owned Trailer');
            }
            if(isAviable.unisured === true){
                isAviable.unisured = !cover.includes('Unisured Motorist');
            }
        }

        setAviable(isAviable);
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
                        CLIENT POLICIES
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
                        {!loadError ? 'Loading Policies information...':'Someting whent wrong, try again later...'}
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
                    REGISTERED POLICIES
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
                    New Policy <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    style={{
                        backgroundColor:'#FF0000'
                    }}
                    columns={[
                        {field: 'id', headerName: 'ID', headerClassName: classes.gridHeader, flex: 1, hide: true},
                        {field: 'company', headerName: 'COMPANY', headerClassName: classes.gridHeader, flex: 1},
                        {field: 'naic', headerName: 'NIAC', headerClassName: classes.gridHeader, flex: .75},
                        {field: 'number', headerName: 'P. NUMBER', headerClassName: classes.gridHeader, flex: .75},
                        {field: 'from', headerName: 'START', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'to', headerName: 'END', headerClassName: classes.gridHeader, flex: .7},
                        {field: 'covers', headerName: 'COVERAGE', headerClassName: classes.gridHeader, flex: 2},
                        {field: 'action', headerName: 'ACTIONS', headerClassName: classes.gridHeader, flex: .75, sortable: false, 
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
                                            onClick={()=> removePolicy(params.value)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>
                                    </Box>
                                </>
                            ),
                            }
                        ]} 

                    rows={policies} 

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
                    top: '5%',
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
                            NEW POLICY
                        </Typography>
                    </Toolbar>
                </AppBar>
            
                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Company Name"
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
                    label="Company NAIC."
                    variant="filled" 
                    value={newNaic}
                    onChange={(e) => setNaic(e.target.value)}
                />

                <TextField 
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    label="Policy Number"
                    variant="filled" 
                    value={newNumber}
                    onChange={(e) => setNumber(e.target.value)}
                />

                <TextField //Maybe here i can put some readOnly field where the value date is formated and the real value stored in the constant
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    variant="filled" 
                    label="Effective Date"
                    type="date"
                    defaultValue="1900-01-01"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newFrom}
                    onChange={(e) => setFrom(e.target.value)}
                />

                <TextField
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                    variant="filled" 
                    label="Expiration Date"
                    type="date"
                    defaultValue="1900-01-01"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newTo}
                    onChange={(e) => setTo(e.target.value)}
                />

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
                        Policy Coverages
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
                            disabled={!aviable.liability}
                            name="liability"
                            color="primary"
                            checked={liability}
                            onChange={coversHandler}
                        />
                        }
                        label="Liability"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            disabled={!aviable.cargo}
                            name="cargo"
                            color="primary"
                            checked={cargo}
                            onChange={coversHandler}
                        />
                        }
                        label="Cargo"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            disabled={!aviable.general}
                            name="general"
                            color="primary"
                            checked={general}
                            onChange={coversHandler}
                        />
                        }
                        label="Gral. Liability"
                    />
                </FormGroup>

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
                            disabled={!aviable.damage}
                            name="damage"
                            color="primary"
                            checked={damage}
                            onChange={coversHandler}
                        />
                        }
                        label="P. Damage"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            disabled={!aviable.interchange}
                            name="interchange"
                            color="primary"
                            checked={interchange}
                            onChange={coversHandler}
                        />
                        }
                        label="T. Interchange"
                    />
                </FormGroup>

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
                            disabled={!aviable.non}
                            name="non"
                            color="primary"
                            checked={non}
                            onChange={coversHandler}
                        />
                        }
                        label="T. Non-owned"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            disabled={!aviable.unisured}
                            name="unisured"
                            color="primary"
                            checked={unisured}
                            onChange={coversHandler}
                        />
                        }
                        label="Unisured Motorist"
                    />
                </FormGroup>

                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}

                    onClick={createPolicy}
                >
                    Create Policy
                </Button>
            </Box>
            
        </Modal>        

    </>
  );
}
