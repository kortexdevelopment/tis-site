import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

import logo from '../media/logo.png';
// 3973E5 primary
// A5C0F3 secondary
// FF0000 red

import * as API from '../lib/api';

export default function Login() {

    let history = useHistory();

    const [user, SetUser] = React.useState('');
    const [pass, SetPass] = React.useState('');
    const [wait, DoWait] = React.useState(false);

    const handleLogin = async() =>
    {
        DoWait(true);

        if(![user, pass].every(Boolean))
        {
            alert('All fields are requiered');
            DoWait(false);
            return;
        }
        
        try{
            var LoginResult = await verifyLogin();
        }
        catch(e){
            LoginResult = undefined;
        }

        if(LoginResult === undefined || LoginResult.error){
            alert('Invalid credentials. Please verify information');
            DoWait(false);
            return;
        }

        console.log(LoginResult);
        window.localStorage.setItem('session', JSON.stringify(LoginResult));

        clearInputs();
        history.push("/main");
    }

    const verifyLogin = async() => {
        try{
            var result = await API.agencyLogin(user, pass);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            return undefined;
        }

        return result;
    }

    const clearInputs = async() =>{
        SetUser('');
        SetPass('');
        DoWait(false);
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
                    maxWidth: 360,
                }}            
                elevation={10}
            >
                <img 
                    style={{height: 175,
                            width: 360,
                            backgroundColor: '#3973E5',}}
                    src={logo} 
                    alt="TIS Logo" 
                />

                <CardContent>
                    <Typography  variant="h5" component="h2">
                        Log In
                    </Typography>
                    
                    <Box>

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            id="outlined-basic"
                            label="User" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter your User Name"
                            value={user}
                            onChange={(e) => SetUser(e.target.value)}
                            disabled={wait}
                            fullWidth
                        />

                        <TextField 
                            style={{
                                marginTop: 8, 
                            }}
                            id="outlined-basic"
                            label="Password" 
                            variant="outlined" 
                            color= "primary"
                            placeholder="Enter your Password"
                            type="password"
                            value={pass}
                            onChange={(e) => SetPass(e.target.value)}
                            fullWidth
                            disabled={wait}
                        />

                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        style={{
                            marginLeft:8,
                            marginRight:8,
                            marginBottom:16,
                            backgroundColor:'#3973E5',
                        }}
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        disabled={wait}
                    >
                        Log In
                    </Button>
                </CardActions>
            </Card>
        </Container>
    </>
    );
}
