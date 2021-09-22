import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { AppBar,
        Toolbar } from '@material-ui/core';

import { useHistory } from "react-router-dom";

import logo from '../../media/logo.png';
// 3D3D3D primary
// A5C0F3 secondary
// FF0000 red

import * as API from '../../controllers/corporate';

export function Login() {

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
            var result = await API.Login(user, pass);
        }catch(e){
            result = undefined;
        }

        if(result === undefined || result.user === null){
            alert('Invalid credentials. Please verify information');
            DoWait(false);
            return;
        }

        DoWait(false);
        window.localStorage.setItem('crpUser', JSON.stringify(result.user));

        clearInputs();
        history.push("/corporate/main");
    }

    const clearInputs = async() =>{
        SetUser('');
        SetPass('');
        DoWait(false);
    }

    const handleCorporate = async() => {
        history.push("/");
    }

    return (
    <>
        <AppBar position="static">
            <Toolbar 
                variant="dense"
                style={{
                    backgroundColor:'#3D3D3D',
                    display:'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    color="primary"
                    style={{
                        marginLeft:8,
                        marginRight:8,
                        backgroundColor:'#FFFFFF',
                        color:'#3D3D3D',
                        fontWeight: 'bold',
                        borderRadius: 16
                    }}
                    variant="contained"
                    onClick={handleCorporate}
                >
                    AGENCY ACCESS
                </Button>
            </Toolbar>
        </AppBar>

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
                            backgroundColor: '#3D3D3D',}}
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
                            backgroundColor:'#3D3D3D',
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
