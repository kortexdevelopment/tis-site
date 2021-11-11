import * as API from '../lib/api';

export const Companies = async(cid) => {
    try{
        var result = await API.clientCompanies(cid);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.COMPANIES \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.companies;
    var companies = [];

    for(var i = 0; i < raw.length; i++){
        var addres = raw[i][3].split('::');

        var companie = {
            id: raw[i][0],
            name: raw[i][2],
            address: addres[0],
            city: addres[1],
            state: addres[2],
            zip: addres[3],
        }

        companies.push(companie);
    }

    return companies;
}

export const NewCompany = async(data) =>{
    try{
        var result = await API.clientNewCompany(data);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.NEW COMPANY \n${e}`);
        result = undefined;
    }

    if(result === undefined || result.error)
    {
        return undefined;
    }

    return result;
}

export const RemoveCompany = async(data) =>{
    try{
        var result = await API.clientRemoveCompany(data);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.REMOVE COMPANY \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Certificates = async(id) =>{
    try{
        var result = await API.clientCertificates(id);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.CERTIFICATES \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.certificates;
    var certificates = [];

    for(var i = 0; i < raw.length; i++){
        var certificate = {
            id: raw[i][0],
            holder: raw[i][1],
            date: raw[i][2],
        }

        certificates.push(certificate);
    }

    return certificates;
}

export const NewCertificate = async(id, note) =>{
    try{
        var result = await API.clientNewCertificate(id, note);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.NEW CERTIFICATE \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}

export const NewCertificatePdf = async(id) =>{
    try{
        var result = await API.clientNewCertificatePdf(id);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.NEW CERTIFICATE PDF\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}

export const SendMail = async(id, to, cc) =>{
    try{
        var result = await API.sendCertMail(id, to, cc);
    }
    catch(e){
        console.error(`Controller Error : CERTIFICATES.SEND MAIL\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}