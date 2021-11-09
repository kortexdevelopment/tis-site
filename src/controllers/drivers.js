import * as API from '../lib/api';
import * as Formats from '../lib/formaters';

export const Drivers = async(cid) =>{
    try{
        var result = await API.clientDrivers(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.DRIVERS \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.drivers;
    var drivers = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var driver = {
            id: raw[a][0],
            name: raw[a][2],
            licence: raw[a][3],
            state: raw[a][4],
            dob: raw[a][5],
            doh: raw[a][6],
            dobLabel: Formats.QuickDate(raw[a][5]), //?Ajustar formato de fecha desde creacion / Hacer un formato de visualizacion independiente
            dohLabel: Formats.QuickDate(raw[a][6]),
            exp: raw[a][7],
        }

        drivers.push(driver);
    }
    
    return drivers;
}

export const NewDriver = async(driverData) =>{
    try{
        var result = await API.clientNewDriver(driverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW DRIVER \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemoveDriver = async(driverData) =>{
    try{
        var result = await API.clientRemoveDriver(driverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.REMOVE DRIVER \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Update = async(data) => {
    try{
        var result = await API.clientUpdateDriver(data);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.UPDATE DRIVER \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}