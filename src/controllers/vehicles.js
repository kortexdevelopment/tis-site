import * as API from '../lib/api';
import * as Formats from '../lib/formaters';

export const Vehicles = async(cid) =>{
    try{
        var result = await API.clientVehicles(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.vehicles;
    var vehicles = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var vehicle = {
            id: raw[a][0],
            make: raw[a][2],
            year: raw[a][3],
            gvw: raw[a][4],
            vin: raw[a][5],
            model: raw[a][6],
            valueLabel: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(raw[a][7])),
            deductibleLabel: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(raw[a][8])),
            value: Number(raw[a][7]),
            deductible: Number(raw[a][8]),
        }

        vehicles.push(vehicle);
    }
    
    return vehicles;

}

export const NewVehicle = async(vehicleData) =>{
    try{
        var result = await API.clientNewVehicle(vehicleData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemoveVehicle = async(vehicleData) =>{
    try{
        var result = await API.clientRemoveVehicle(vehicleData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Update = async(data) =>{
    try{
        var result = await API.clientUpdateVehicle(data);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.UPDATE VEHICLE\N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}