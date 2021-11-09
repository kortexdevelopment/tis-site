import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import * as Controller from '../../../controllers/corporate';

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
  contentMain:{
      display: 'flex',
      flexDirection: 'column'
  }
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

export default function EditCompany(props) {
    const styles = useStyles();

    const [boot, didBoot] = React.useState(false);
    const [company, setCompany] = React.useState({
        id: 0,
        name: '',
        company: '',
        producer: '',
        lic_number: '',
        acces_finish: '',
        phone: '',
        phoneNumber: '',
        emailAddress: '',
        phone_fax: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        master_pass: 'master',
        status: 1,
    })

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        setCompany(props.company);
    });

    const handleChange = async(e) =>{
        setCompany({...company, [e.target.name] : e.target.value});
    }

    const handleConfirm = async() =>{
        for(const key in company){
            if(![company[key]].every(Boolean)){
                alert('All parameters are required. \nPlease verify your information');
                return;
            }
        }

        var doIt = await window.confirm('The information will be updated. \nDo you want to proceed?');

        if(!doIt){
            return;
        }
        var copy = company;
        copy.name = `${copy.producer}:${copy.company}`;
        copy.phone = `${copy.phoneNumber}:${copy.emailAddress}`;

        var data = new FormData();
        for(const key in copy){
            data.append(`${key}`, company[key]);
        }

        handleProcess(data);
    }

    const handleProcess = async(data) =>{
        try{
            var result = await Controller.UpdateCompany(data);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while updating information. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.success){
            props.onSuccess();
        }
    }

  return (
    <>
        <Container
            style={{
                display: 'flex',
                marginTop: '5%',
                justifyContent: 'center',
            }}
        >
            <Card 
                style={{
                    width: '80%',
                }}            
                elevation={10}
            >

                <CardContent>
                    <Typography variant="h6" color="inherit">
                        EDIT COMPANY
                    </Typography>
                    
                    <Divider />

                    <Box
                        className={styles.contentMain}
                    >
                        <TextField 
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                            label="Company Name"
                            variant="filled" 
                            name='company'
                            value={company.company}
                            onChange={handleChange}
                        />

                        <TextField 
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                            label="Producer Name"
                            variant="filled" 
                            name='producer'
                            value={company.producer}
                            onChange={handleChange}
                        />

                        <TextField 
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                            label="Licence"
                            variant="filled" 
                            name='lic_number'
                            value={company.lic_number}
                            onChange={handleChange}
                        />

                        <TextField 
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                            label="Access Expiration"
                            variant="filled" 
                            type='date'
                            variant="filled" 
                            defaultValue={"1900-01-01"}
                            name='acces_finish'
                            value={company.acces_finish}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Box
                            style={{
                                display:'flex',
                                justifyContent: 'space-around',
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                        >
                            <TextField 
                                style={{
                                    flex: 1,
                                    marginRight: 15,
                                }}
                                label="Phone"
                                variant="filled" 
                                name='phoneNumber'
                                value={company.phoneNumber}
                                onChange={handleChange}
                            />

                            <TextField 
                                style={{
                                    flex: 1,
                                    marginRight: 15,
                                }}
                                label="Fax"
                                variant="filled"
                                name='phone_fax'
                                value={company.phone_fax}
                                onChange={handleChange}
                            />

                            <TextField 
                                style={{
                                    flex: 1
                                }}
                                label="E-mail"
                                variant="filled"
                                name='emailAddress'
                                value={company.emailAddress}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box
                            style={{
                                display:'flex',
                                justifyContent: 'space-around',
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                        >
                            <TextField 
                                style={{
                                    flex: 1,
                                    marginRight: 15,
                                }}
                                label="Address"
                                variant="filled" 
                                name='address'
                                value={company.address}
                                onChange={handleChange}
                            />

                            <TextField 
                                style={{
                                    flex: 1
                                }}
                                label="City"
                                variant="filled" 
                                name='city'
                                value={company.city}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box
                            style={{
                                display:'flex',
                                justifyContent: 'space-around',
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                        >
                            <TextField 
                                style={{
                                    flex: 1,
                                    marginRight: 15,
                                }}
                                label="State"
                                variant="filled" 
                                name='state'
                                value={company.state}
                                onChange={handleChange}
                            />

                            <TextField 
                                style={{
                                    flex: 1
                                }}
                                label="Zip"
                                variant="filled" 
                                name='zip'
                                value={company.zip}
                                onChange={handleChange}
                            />
                        </Box>

                    </Box>
                </CardContent>

                <CardActions>
                    <Button
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 15,
                            marginRight: 15,
                            backgroundColor: '#CC0000',
                            fontWeight: 'bold',
                            color: '#FFFFFF'
                        }}
                        fullWidth
                        onClick={props.onCancel}
                    >
                        CANCEL
                    </Button>
                    <Button
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 15,
                            marginRight: 15,
                            backgroundColor: '#00CC00',
                            fontWeight: 'bold',
                            color: '#FFFFFF'
                        }}
                        fullWidth
                        onClick={handleConfirm}
                    >
                        UPDATE
                    </Button>
                </CardActions>
            </Card>

        </Container>
    </>
  );
}
