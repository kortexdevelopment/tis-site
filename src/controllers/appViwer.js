import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import PDFViwerRoot from './PDFViwerRoot';

export function AppViwer(props) {

    const [file, setFile] = React.useState(0);

    const handleNavigation = async(dir) => {
        var temp = file + dir;

        if(temp > (props.files.length - 1)){
            temp = 0;
        }
        
        if(temp < 0){
            temp = props.files.length - 1;
        }

        setFile(temp);
    }

    return (
        <>
            <Box
                style={{
                    display:'flex',
                    flexDirection: 'column',
                    width:'100%',
                    alignItems: 'center',
                }}
            >
                <Box
                    style={{
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                     <Typography 
                        style={{
                            color:"#3973E5",
                            flex: 1,
                        }}
                    >
                        NAVIGATION
                    </Typography>

                    <Box 
                        style={{
                            display:'flex',
                            direction:'row',
                            padding: 8,
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: '#3973E5',
                                color: '#FFFFFF',
                                borderRadius: 45,
                            }}
                            onClick={() => handleNavigation(-1)}
                        >
                            {'<'}
                        </Button>

                        <Typography 
                            variant='h6'
                            style={{
                                color:"#3973E5",
                                flex: 1,
                                marginLeft: 4,
                                marginRight: 4,
                            }}
                        >
                            File {file + 1} of {props.files.length}
                        </Typography>

                        <Button
                            style={{
                                backgroundColor: '#3973E5',
                                color: '#FFFFFF',
                                borderRadius: 45,
                            }}
                            onClick={() => handleNavigation(1)}
                        >
                            {'>'}
                        </Button>
                    </Box>
                
                </Box>

                <Box
                    style={{
                        width:'100%',
                        height:750
                    }}
                >
                    {/* <iframe
                        width="750"
                        height="750"
                        src={props.files[file]}
                        name='file'
                    >
                    </iframe> */}

                    <PDFViwerRoot file={props.files[file]} />
                </Box>
            </Box>
        </>
    );
}