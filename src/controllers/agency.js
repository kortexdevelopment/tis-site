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