import * as API from '../lib/api';

export const Profile = async(id) =>{
    try{
        var agencyData = await API.agencyData(id);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.PROFILE \n${e}`);
        agencyData = undefined;
    }

    if(agencyData === undefined){
        return undefined;
    }

    var data = agencyData.data;
    var names = data[1];
    var phones = data[3];

    var profileData = {
        producerName: names.split(':')[0],
        agencyName: names.split(':')[1],
        license: data[2],
        phoneNumber: phones.split(":")[0],
        faxNumber: data[4],
        email: phones.split(":")[1],
        address: data[5],
        city: data[6],
        state: data[7],
        zip: data[8],
    }

    return profileData;
}

export const Agents = async(id) =>{
    try{
        var agencyAgents = await API.agencyAgents(id);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.AGENTS \n${e}`);
        agencyAgents = undefined;
    }

    if(agencyAgents === undefined){
        return undefined;
    }

    var agents = agencyAgents.agents;
    var results = [];
    
    for(var a = 0; a < agents.length; a++){
        var agent = {
            id: agents[a][0],
            name: agents[a][2],
            mail: agents[a][3],
            pass: agents[a][4],
            level: agents[a][5] === 1 ? 'Normal User' : 'Admin'
        }

        results.push(agent);
    }

    return results;
}

export const NewAgent = async(id, name, pass, mail, level) => {
    try{
        var result = await API.agencyNewAgent(id, name, pass, mail, level);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.NEW AGENT \n${e}`);
        return undefined;
    }

    return result;
}

export const RemoveAgent = async(id) =>{
    try{
        var result = await API.agencyRemoveAgent(id);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.REMOVE AGENT \n${e}`);
        return undefined;
    }

    return result;
}

export const Agenda = async(id) =>{
    try{
        var agencyClients = await API.agencyClients(id);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.AGENDA \n${e}`);
        agencyClients = undefined;
    }

    if(agencyClients === undefined){
        return undefined;
    }

    var clients = agencyClients.clients;
    var results = [];
    
    for(var a = 0; a < clients.length; a++){
        var client = {
            id: clients[a][0],
            nameF: clients[a][2],
            nameL: clients[a][3],
            bsn: clients[a][4],
            phone: clients[a][5],
            mail: clients[a][6],
        }

        results.push(client);
    }
    
    return results;
}