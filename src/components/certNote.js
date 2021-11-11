import React from 'react';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

export default function CertNote(props){
    const [note, setNote] = React.useState('');

    const handleConfirm = async() => {
        if(note === ''){
            var noted = await window.confirm('The note is empty. Do you want to proceed?');

            if(!noted){
                return;
            }    
        }

        var doIt = await window.confirm('Do you want to create a New Certificate for the selected Company?');

        if(!doIt){
            return;
        }

        props.noteUpdated(note);
        props.onConfirm(props.id);
    }
    
    return(
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
                        CERTIFICATE CREATION
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
                    NOTE
                </Typography>

                <Divider />
            </Box>

            <TextField 
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                multiline
                label="Optional Note"
                variant="outlined" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <Box>
                <Button
                    style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: '#FF5555',
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
                    Generate Certificate
                </Button>
            </Box>
        </Box>
    );
}