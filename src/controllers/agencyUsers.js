import * as API from '../lib/api';

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
            level: Number(agents[a][5]),
            levelLabel: Number(agents[a][5]) === 1 ? 'Normal Agent' : 'Admin Agent',
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

export const Update = async(data) =>{
    try{
        var result = await API.agencyAgentUpdate(data);
    }
    catch(e){
        console.error(`Controller Error : AGENCY.UPDATE AGENT \n${e}`);
        return undefined;
    }

    return result;
}