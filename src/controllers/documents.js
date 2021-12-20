import * as API from '../lib/api';

export const Upload = async(form) =>{
    try{
        var result = await API.documentUpload(form);
    }
    catch(e){
        console.error(`Controller Error : DOCUMENT.UPLOAD \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const List = async(id) =>{
    try{
        var result = await API.documentList(id);
    }
    catch(e){
        console.error(`Controller Error : DOCUMENT.LIST \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var list = result.files;
    var documents = [];
    
    for(var i = 0; i < list.length; i++){
        var document = {
            id: list[i][0],
            file: list[i][2],
            name: list[i][3],
            type: Number(list[i][4]) === 1 ? 'Available' : 'Not available',
        }

        documents.push(document);
    }

    return documents;
}

export const Delete = async(data) =>{
    try{
        var result = await API.documentDelete(data);
    }
    catch(e){
        console.error(`Controller Error : DOCUMENT.DELETE \n${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}