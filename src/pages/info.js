import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

// 3973E5 primary
// A5C0F3 secondary
// FF0000 red
export default function Info() {
  const classes = useStyles();

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
                        WELCOME
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </div>

        <Container
            style={{
                display: 'flex',
                marginTop: '10%',
                justifyContent: 'center',
            }}
        >
            <Card 
                style={{
                    borderWidth: 5,
                    borderColor: '#3973E5'
                }}            
                elevation={10}
            >
                <CardContent>
                    <Typography  
                        variant="h5" 
                        component="h2"
                        style={{
                            color:'#3973E5'
                        }}
                    >
                        WELCOME
                    </Typography>

                    <Typography
                        style={{
                            color:'#3973E5'
                        }}
                    >
                        To navigate througth the system, please use the left panel.
                    </Typography>
                </CardContent>
                
            </Card>
        </Container>
    </>
  );
}
