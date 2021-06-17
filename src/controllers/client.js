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
    
    if(extra === null){
        extra = [0];
        extra.length = 20;
        extra.fill(null);
    }

    var clientProfile ={
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
        dateFrom: extra[10],
        dateTo: extra[11],
        numPolicy: extra[12],
        typePolicy: extra[13],
        losNum: extra[14],
        losMoney: extra[15],
        losDriver: extra[16],
        numViolations: extra[7],
        numAccidents: extra[8],
        numMiles: extra[9],

        readyAddress : function() {
            return ![this.gAddress,this.gCity,this.gState,this.gZip,this.mAddress,this.mCity,this.mState,this.mZip].every((x) => x === null || x === undefined);
            },
        
        readyFiling : function() {
            return ![this.aFinance,this.aAccount,this.bFinance,this.bAccount,this.numCa,this.numMc,this.numUsDot].every((x) => x === null || x === undefined);
            },

        readyAditional : function() {
            return ![this.yrsBussines, this.yrsStarted, this.prior, this.caDesc, this.caAverage, this.caMax, this.cbDesc, this.cbAverage, this.cbMax, this.dateFrom, this.dateTo, this.numPolicy, this.typePolicy, this.losNum, this.losMoney, this.losDriver, this.numViolations, this.numAccidents, this.numMiles].every((x) => x === null || x === undefined);
            },
    }

    return clientProfile;
}