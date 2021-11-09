import * as API from '../lib/corporate';
import * as Formats from '../lib/formaters';

export const Login = async(user, pass) => {
    
    try{
        var result = await API.Login(user, pass);
    }catch(e){
        result = undefined;
    }

    if(result === undefined){
        return false;
    }

    return result;
}

export const Companies = async() =>{
    try{
        var result = await API.Companies();
    }catch(e){
        result = undefined;
    }

    if(result === undefined){
        return [];
    }

    var raw = result.companies;
    var companies = [];

    for(var i = 0; i < raw.length; i++){
        var names = raw[i][1].split(':');
        var contacts = raw[i][3].split(':');
        var company = {
            id: raw[i][0],
            name: raw[i][1],
            producer: names[0],
            company: names[1],
            lic_number: raw[i][2],
            phoneNumber: contacts[0],
            emailAddress: contacts[1],
            phone: raw[i][3],
            phone_fax: raw[i][4],
            address: raw[i][5],
            city: raw[i][6],
            state: raw[i][7],
            zip: raw[i][8],
            acces_finish: raw[i][9],
            expiration: Formats.QuickDate(raw[i][9]),
            status: Number(raw[i][10]),
            statusTx: Number(raw[i][10]) === 1 ? 'Active' : 'Inactive',
            master_pass: raw[i][11],
        }

        companies.push(company);
    }

    return companies;
}

export const CreateCompany = async(company) =>{
    try{
        var result = await API.CompaniesCreate(company);
    }catch(e){
        console.log(e);
        return false;
    }

    return result;
}

export const UpdateCompany = async(company) =>{
    try{
        var result = await API.CompaniesUpdate(company);
    }catch(e){
        console.log(e);
        return false;
    }

    return result;
}

export const Users = async() =>{
    try{
        var result = await API.Users();
    }catch(e){
        return [];
    }

    var raw = result.users;
    var users = [];

    for(var i = 0; i < raw.length; i++){
        var user = {
            id: Number(raw[i][0]),
            name: raw[i][1],
            email: raw[i][2],
            pass: raw[i][3],
            role: raw[i][4],
            roleLabel: raw[i][4].toUpperCase(),
        }

        users.push(user);
    }

    return users;
}

export const UserCreate = async(data) => {
    try{
        var result = await API.UserCreate(data);
    }catch(e){
        return undefined;
    }

    return result;
}

export const UserRemove = async(data) => {
    try{
        var result = await API.UserRemove(data);
    }catch(e){
        return undefined;
    }

    return result;
}

export const UserUpdate = async(data) => {
    try{
        var result = await API.UserUpdate(data);
    }catch(e){
        return undefined;
    }

    return result;
}