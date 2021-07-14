import React from 'react';
import { Box } from '@material-ui/core';

import PDFViwerRoot from './PDFViwerRoot';
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
                        width:"99%",
                        height:750,
                    }}
                >
                    <PDFViwerRoot file={props.file}/>
                </Box>
            </Box>
        </>
    );
}