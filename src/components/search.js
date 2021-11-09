import React from 'react';
import Box from '@material-ui/core/Box';
import { Button,
        TextField } from '@material-ui/core';

export default function Searcher(props){

    const [pattern, setPattern] = React.useState('');

    React.useEffect(() => {
        if(pattern === ''){
            handleFilter();
        }
    }, [pattern]);

    const handleKey = async(e) => {
        if(e.key !== 'Enter'){
            return;
        }

        handleFilter();
    }

    const handleFilter = async() => {

        var re = new RegExp(`${pattern}`,'i');

        var original = props.original;
        var fields = props.fields;
        var results = new Array(fields.length);
        var final = [];

        if(pattern === ''){
            props.onUpdate(original);
            return;
        }

        for(var i = 0; i < fields.length; i++){
            results[i] = new Array();
            var result = original.filter(c => re.test(c[fields[i]]));
            results[i] = result;
        }

        for(var r = 0; r < fields.length; r++){
            final = [...results[r], ...final];
        }
        
        props.onUpdate(final);
    }

    const handleClear = async() => {
        setPattern('');
    }

    return(
        <Box
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <TextField
                label='Enter Search'
                onKeyDown={handleKey}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
            />

            <Button
                style={{
                    marginTop: 8,
                    marginLeft: 15,
                    marginRight: 15,
                    backgroundColor: props.color,
                    color: '#FFFFFF'
                }}
                onClick={handleFilter}
            >
                Search
            </Button>

            {pattern !== '' && (
                <Button
                    style={{
                        marginTop: 8,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: props.color,
                        color: '#FFFFFF'
                    }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
            )}
        </Box>
    );
}