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

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

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

export default function ClientCoverage() {
    const classes = useStyles();
    const [ded, setDed] = React.useState(-1);

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

        <Container
            className={classes.containerRoot}
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
                    />
                    <IconButton
                        style={{
                            color: '#FFFFFF'
                        }}
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
                            labelId="title"
                            value={ded}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={1}>$750,000</MenuItem>
                            <MenuItem value={2}>$1,000,000</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            labelId="title"
                            value={ded}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1}>$1,000</MenuItem>
                            <MenuItem value={2}>$2,500</MenuItem>
                            <MenuItem value={3}>$5,000</MenuItem>
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
                        <Input
                            id="value"
                            type='number'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            labelId="title"
                            value={ded}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1}>$1,000</MenuItem>
                            <MenuItem value={2}>$2,500</MenuItem>
                            <MenuItem value={3}>$5,000</MenuItem>
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
                        <Input
                            id="value"
                            type='number'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>

                    <FormControl className={classes.selectControl}>
                        <InputLabel id="title">Deductible </InputLabel>
                        <Select
                            labelId="title"
                            value={ded}
                            displayEmpty
                        >
                            <MenuItem value={-1}>Select an option</MenuItem>
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1}>$1,000</MenuItem>
                            <MenuItem value={2}>$2,500</MenuItem>
                            <MenuItem value={3}>$5,000</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

            </Box>

        </Container>

    </>
);
}
