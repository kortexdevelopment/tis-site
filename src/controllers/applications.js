import * as API from '../lib/api';

export const Agents = async() =>{
    try{
        var result = await API.applicationAgents();
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.AGENTS\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.agents;
    var agents = [];

    for(var i = 0; i < raw.length; i++){
        var agent = {
            id: raw[i][0],
            name: raw[i][1],
            image: raw[i][2],
        }

        agents.push(agent);
    }

    return agents;
}

export const Vendors = async(id) =>{
    try{
        var result = await API.applicationVendors(id);
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.VENDORS\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.vendors;
    var vendors = [];

    for(var i = 0; i < raw.length; i++){
        var vendor = {
            id: raw[i][0],
            name: raw[i][1],
            image: raw[i][2],
        }

        vendors.push(vendor);
    }

    return vendors;
}

export const Templates = async(aid, vid) =>{
    try{
        var result = await API.applicationTemplates(aid, vid);
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.TEMPLATES\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.templates;
    var templates = [];
    var txtCovers = ['', 'Liability', 'Cargo', 'Gral. Liability', 'PD. Tractor', 'PD. Trailer', 'PD. Non-owned', 'PD. T. Interchange'];

    for(var i = 0; i < raw.length; i++){
        
        var covers = raw[i][4].split(',');
        var coversTxt = [];

        for(var x = 0; x < covers.length; x++){
            coversTxt.push(txtCovers[covers[x]]);
        }

        var template = {
            id: raw[i][0],
            name: raw[i][2],
            file: raw[i][3],
            covers: covers,
            coversTxt: coversTxt,
        }

        templates.push(template);
    }

    return templates;
}

export const CreateLink = async(data) => {
    try{
        var result = await API.applicationCreateLink(data);
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.CREATE LINK\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}

export const CreateData = async(data) => {
    try{
        var result = await API.applicationCreateData(data);
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.CREATE DATA\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}

export const CreatePdf = async(data) => {
    try{
        var result = await API.applicationCreatePdf(data);
    }
    catch(e){
        console.error(`Controller Error : APPLICATION.CREATE PDF\n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return result;
}