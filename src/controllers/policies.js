import * as API from '../lib/api';
import * as Formats from '../lib/formaters';

export const Policies = async(cid) =>{
    try{
        var result = await API.clientPolices(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.POLICIES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.policies;
    var policies = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var cover = raw[a][6].split(',');

        var policy = {
            id: raw[a][0],
            company: raw[a][2],
            number: raw[a][3],
            from: raw[a][4],
            to: raw[a][5],
            fromLabel: Formats.QuickDate(raw[a][4]),
            toLabel: Formats.QuickDate(raw[a][5]),
            covers: cover,
            niac: raw[a][8],
        }

        policies.push(policy);
    }
    
    return policies;
}

export const NewPolicy = async(policyData) =>{
    try{
        var result = await API.clientNewPolicy(policyData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW POLICY \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemovePolicy = async(policyData) =>{
    try{
        var result = await API.clientRemovePolicy(policyData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.REMOVE POLICY \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Update = async(policyData) =>{
    try{
        var result = await API.clientUpdatePolicy(policyData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.UPDATE POLICY \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}