import * as API from '../lib/api';
import * as Formats from '../lib/formaters';

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
    
    if(extra === null){
        extra = [0];
        extra.length = 20;
        extra.fill(null);
    }

    var clientProfile ={
        id: main[0],
        //General Info
        nameF: main[2],
        nameL: main[3],
        nameB: main[4],
        phone: main[5],
        mail: main[6],

        //Address Info
        gAddress: main[7],
        gCity: main[8],
        gState: main[9],
        gZip: main[10],
        mAddress: main[11],
        mCity: main[12],
        mState: main[13],
        mZip: main[14],
        radius: main[15],

        //Filing Info
        aFinance: main[17],
        aAccount: main[18],
        bFinance: main[19],
        bAccount: main[20],
        numCa: main[21],
        numMc: main[22],
        numUsDot: main[23],

        //Aditional Info
        yrsBussines: extra[2],
        yrsStarted: extra[3],
        prior: extra[4],
        caDesc: extra[5],
        caAverage: extra[17],
        caMax: extra[19],
        cbDesc: extra[6],
        cbAverage: extra[18],
        cbMax: extra[20],
        dateFrom: Formats.QuickDate(extra[10]),
        dateTo: Formats.QuickDate(extra[11]),
        numPolicy: extra[12],
        typePolicy: extra[13],
        losNum: extra[14],
        losMoney: extra[15],
        losDriver: extra[16],
        numViolations: extra[7],
        numAccidents: extra[8],
        numMiles: extra[9],

        readyAddress : function() {
            return [this.gAddress,this.gCity,this.gState,this.gZip,this.mAddress,this.mCity,this.mState,this.mZip,this.radius].every(Boolean);
            },
        
        readyFiling : function() {
            return [this.aFinance,this.aAccount,this.bFinance,this.bAccount,this.numCa,this.numMc,this.numUsDot].every(Boolean);
            },

        readyAditional : function() {
            return [this.yrsBussines, this.yrsStarted, this.prior, this.caDesc, this.caAverage, this.caMax, this.cbDesc, this.cbAverage, this.cbMax, this.dateFrom, this.dateTo, this.numPolicy, this.typePolicy, this.losNum, this.losMoney, this.losDriver, this.numViolations, this.numAccidents, this.numMiles].every(Boolean);
            },
    }

    return clientProfile;
}

export const UpdateProfile = async(profile) =>{
    try{
        var result = await API.clientUpdateProfile(profile);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.UPDATE PROFILE \n${e}`);
        result = undefined;
    }        

    if(result === undefined){
        return undefined;
    }

    return true;
}

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
        var appUser = {
            id: users[a][0],
            user: users[a][2],
            pass: users[a][3],
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

export const Drivers = async(cid) =>{
    try{
        var result = await API.clientDrivers(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.DRIVERS \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.drivers;
    var drivers = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var driver = {
            id: raw[a][0],
            name: raw[a][2],
            licence: raw[a][3],
            state: raw[a][4],
            dob: raw[a][5], //?Ajustar formato de fecha desde creacion / Hacer un formato de visualizacion independiente
            doh: raw[a][6],
            exp: raw[a][7],
        }

        drivers.push(driver);
    }
    
    return drivers;
}

export const NewDriver = async(driverData) =>{
    try{
        var result = await API.clientNewDriver(driverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW DRIVER \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemoveDriver = async(driverData) =>{
    try{
        var result = await API.clientRemoveDriver(driverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.REMOVE DRIVER \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Vehicles = async(cid) =>{
    try{
        var result = await API.clientVehicles(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.vehicles;
    var vehicles = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var vehicle = {
            id: raw[a][0],
            make: raw[a][2],
            year: raw[a][3],
            gvw: raw[a][4],
            vin: raw[a][5],
            model: raw[a][6],
            value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(raw[a][7])),
            deductible: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(raw[a][8])),
        }

        vehicles.push(vehicle);
    }
    
    return vehicles;

}

export const NewVehicle = async(vehicleData) =>{
    try{
        var result = await API.clientNewVehicle(vehicleData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemoveVehicle = async(vehicleData) =>{
    try{
        var result = await API.clientRemoveVehicle(vehicleData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW VEHICLES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Policies = async(cid) =>{
    try{
        var result = await API.clientPolices(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.POLICIES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.policies;
    var policies = [];

    for(var a = 0; a < raw.length; a++)    
    {
        var cover = raw[a][6].split(',');

        var policy = {
            id: raw[a][0],
            company: raw[a][2],
            number: raw[a][3],
            from: Formats.QuickDate(raw[a][4]),
            to: Formats.QuickDate(raw[a][5]),
            covers: cover,
            niac: raw[a][8],
        }

        policies.push(policy);
    }
    
    return policies;
}

export const NewPolicy = async(policyData) =>{
    try{
        var result = await API.clientNewPolicy(policyData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW POLICY \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const RemovePolicy = async(policyData) =>{
    try{
        var result = await API.clientRemovePolicy(policyData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.REMOVE POLICY \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const Coverages = async(cid) =>{
    try{
        var result = await API.clientCoverages(cid);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.COVERAGES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    var raw = result.coverages;
    var coverages = undefined;    
    if(raw.length === Number(0)){
        coverages = {
            id: undefined,
            update: false,
            vLiability: -1,
            dLiability: -1,
            vCargo: 0,
            dCargo: -1,
            vGeneral: 0,
            dGeneral: -1,
        }
    }
    else{
        coverages = {
            id: raw[0][0],
            update: true,
            vLiability: raw[0][2],
            dLiability: raw[0][3],
            // vCargo: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 }).format(Number(raw[0][4])),
            vCargo: raw[0][4],
            dCargo: raw[0][5],
            vGeneral: raw[0][6],
            dGeneral: raw[0][7],
        }
    }

    return coverages;
}

export const NewCoverages = async(coverData) =>{
    try{
        var result = await API.clientNewCoverages(coverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.NEW COVERAGES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}

export const UpdateCoverages = async(coverData) =>{
    try{
        var result = await API.clientUpdateCoverages(coverData);
    }
    catch(e){
        console.error(`Controller Error : CLIENT.UPDATE COVERAGES \N${e}`);
        result = undefined;
    }

    if(result === undefined){
        return undefined;
    }

    return true;
}