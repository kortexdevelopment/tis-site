import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import * as Controller from '../../../controllers/policies';

const dictionary = {
    liability: 'Liability',
    cargo: 'Cargo',
    general: 'Gral. Liability',
    damage: 'P.Damage',
    interchange: 'Trailer Interchange',
    non: 'Non owned Trailer',
    unisured: 'Unisured Motorist',
} 

export default function PoliciesEdit(props){

    const [boot, didBoot] = React.useState(false);
    const [policy, setPolicy] = React.useState({
        id: 0,
        company: '',
        number: '',
        from: '',
        to: '',
        covers: '',
        niac: '',
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

    const [covers, setCover] = React.useState({
        liability: false,
        cargo: false,
        general: false,
        damage: false,
        interchange: false,
        non: false,
        unisured: false,
    });

    const {liability, cargo, general, damage, interchange, non, unisured} = covers;

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        handleBoot();
    });

    const handleBoot = async() => {
        setPolicy({...props.policy});
        handleAviable();
    }

    const handleAviable = async() => {
        var _av = {...props.aviable};
        var _cv = props.policy.covers;

        _cv.forEach((x) => {
            var key = Object.keys(dictionary).find(key => dictionary[key] === x);
            _av[key] = true;
        });

        setAviable({..._av});
    }

    const handleChanges = async(e) => {
        setPolicy({...policy, [e.target.name]:e.target.value});
    }

    const coversHandler = (event) => {
        setCover({ ...covers, [event.target.name]: event.target.checked});
    }

    const handleCoverData = async() => {
        var result = '';

        for(const key in covers){
            if(covers[key]){
                result += `${dictionary[key]},`;
            }
        }

        return result;
    }

    const handleConfirm = async() => {
        var coverData = await handleCoverData();

        if(coverData === ''){
            alert('One coverage must be selected at least');
            return;
        }

        if(![policy.company, policy.number, policy.from, policy.to].every(Boolean)){
            alert('Missing parameters');
            return;
        }

        var doIt = await window.confirm('The information will be updated. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        policy.covers = coverData;

        try{
            var result = await Controller.Update(policy);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while updating. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.success){
            props.onSuccess();
        }
    }

    return(
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
                        EDIT POLICY
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
                name='company'
                value={policy.company}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Company NAIC. *Optional"
                variant="filled" 
                name='niac'
                value={policy.niac}
                onChange={handleChanges}
            />

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                label="Policy Number"
                variant="filled" 
                name='number'
                value={policy.number}
                onChange={handleChanges}
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
                name='from'
                value={policy.from}
                onChange={handleChanges}
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
                name='to'
                value={policy.to}
                onChange={handleChanges}
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

            <Box>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#FF1111',
                        color: '#FFFFFF'
                    }}
                    onClick={props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#3973E5',
                        color: '#FFFFFF'
                    }}
                    onClick={handleConfirm}
                >
                    Update
                </Button>
            </Box>
        </Box>
    );
}