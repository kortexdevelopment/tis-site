import * as API from '../lib/api';

export const Upload = async(form) =>{
    try{
        var result = await API.documentUpload(form);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.PROFILE \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}