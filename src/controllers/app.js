import * as API from '../lib/api';
import * as Formats from '../lib/formaters';

export const AppUsers = async(cid) =>{
    try{
        var result = await API.clientAppUsers(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT. APP USERS \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var users = result.users;
    var appUsers = [];

    for(var a = 0; a < users.length; a++)    
    {
        var userRaw = users[a][2].split('@');
        var appUser = {
            id: users[a][0],
            user: userRaw[0],
            userLabel: users[a][2],
            pass: users[a][3],
            domain: userRaw[1],
        }

        appUsers.push(appUser);
    }
    
    return appUsers;
}

export const NewAppUser = async(cid, name, pass) => {

    var userData = {
        id: cid,
        name: name,
        pass: pass,
        domain: cid + '.tis',
    }

    try{
        var result = await API.clientNewAppUser(userData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT. NEW APP USERS \N${e}`);
        result = undefined;
    }

    if(result === undefined)
    {
        return undefined
    }

    return true;
}

export const RemoveAppUser = async(uid) => {
    try{
        var result = API.clientRemoveAppUser(uid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT. REMOVE APP USERS \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Update = async(data) => {
    try{
        var result = API.clientAppUserUpdate(data);
    }
    catch(e){
        console.error(`Controller Error : CLIENT. UPDATE APP USERS \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}