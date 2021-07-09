import React from 'react';
import { Box } from '@material-ui/core';

export function CertViwer(props) {

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
                        width:'99%',
                    }}
                >
                    <iframe
                        width="100%"
                        height="750"
                        src={props.file}
                        name='file'
                    >
                    </iframe>
                </Box>
            </Box>
        </>
    );
}