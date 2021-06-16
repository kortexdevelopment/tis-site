import * as API from '../lib/api';

export const Profile = async(cid) => {
    try{
        var result = await API.clientProfile(cid); 
    }
    catch(e){
        console.error(`Controller Error : CLIENT.PROFILE \n${e}`);
        result = undefined;
    }

    if(result === undefined || result.error){
        return undefined;
    }

    var main = result.main;
    var extra = result.extra;
    
    var clientProfile ={
        nameF: main[2],
    }

    return clientProfile;
}