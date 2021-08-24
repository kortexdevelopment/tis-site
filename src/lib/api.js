import * as HTTP from './http';

export const agencyLogin = async(user, pass) => {
  let endpoint = `agencyLogin.php`;

  let urlParams = `?user=${user}&pass=${pass}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const agencyData = async(id) => {
  let endpoint = `agencyData.php`;

  let urlParams = `?company_id=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const agencyAgents = async(id) => {
  let endpoint = `agencyAgents.php`;

  let urlParams = `?company_id=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const agencyRemoveAgent = async(id) => {
  let endpoint = `agencyRemoveAgent.php`;

  let urlParams = `?uid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const agencyClients = async(id) => {
  let endpoint = `agencyClients.php`;

  let urlParams = `?company_id=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientProfile = async(id) => {
  let endpoint = `clientProfile.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientAppUsers = async(id) => {
  let endpoint = `clientAppUsers.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientDrivers = async(id) => {
  let endpoint = `clientDrivers.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientVehicles = async(id) => {
  let endpoint = `clientVehicles.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientPolices = async(id) => {
  let endpoint = `clientPolices.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientCoverages = async(id) => {
  let endpoint = `clientCoverages.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientCompanies = async(id) => {
  let endpoint = `clientCompanies.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientCertificates = async(id) => {
  let endpoint = `clientCertificates.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const applicationAgents = async() => {
  let endpoint = `applicationAgents.php`;

  let urlParams = ``

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const applicationVendors = async(id) => {
  let endpoint = `applicationVendors.php`;

  let urlParams = `?id=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const applicationTemplates = async(aid, vid) => {
  let endpoint = `applicationTemplates.php`;

  let urlParams = `?aid=${aid}&vid=${vid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const documentList = async(id) => {
  let endpoint = `documentList.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const sendCertMail = async(id, to, reply) => {
  let endpoint = `sendCertMail.php`;

  let urlParams = `?to=${to}&pid=${id}&reply${reply}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

///////////////////////////////////POST///////////////////////////////////

export const agencyNewAgent = async (cid, name, pass, mail, level) => {
  let endpoint = `agencyNewAgent.php`;

  const postData = {}
  postData['cid'] = cid;
  postData['name'] = name;
  postData['mail'] = mail;
  postData['pass'] = pass;
  postData['level'] = level;
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const agencyNewClient = async (clientForm) => {
  let endpoint = `agencyNewClient.php`;

  const postData = clientForm
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientUpdateProfile = async (profile) => {
  let endpoint = `clientUpdateProfile.php`;

  const postData = profile
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewAppUser = async (userData) => {
  let endpoint = `clientNewAppUser.php`;

  const postData = userData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientRemoveAppUser = async (uid) => {
  let endpoint = `clientRemoveAppUser.php`;

  const postData = {}
  postData['id'] = uid;
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewDriver = async (driverData) => {
  let endpoint = `clientNewDriver.php`;

  const postData = driverData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientRemoveDriver = async (driverData) => {
  let endpoint = `clientRemoveDriver.php`;

  const postData = driverData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewVehicle = async (vehicleData) => {
  let endpoint = `clientNewVehicle.php`;

  const postData = vehicleData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientRemoveVehicle = async (vehicleData) => {
  let endpoint = `clientRemoveVehicle.php`;

  const postData = vehicleData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewPolicy = async (policyData) => {
  let endpoint = `clientNewPolicy.php`;

  const postData = policyData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientRemovePolicy = async (policyData) => {
  let endpoint = `clientRemovePolicy.php`;

  const postData = policyData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewCoverages = async (coverData) => {
  let endpoint = `clientNewCoverages.php`;

  const postData = coverData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientUpdateCoverages = async (coverData) => {
  let endpoint = `clientUpdateCoverages.php`;

  const postData = coverData
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewCompany = async (info) => {
  let endpoint = `clientNewCompany.php`;

  const postData = info
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientRemoveCompany = async (info) => {
  let endpoint = `clientRemoveCompany.php`;

  const postData = info
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const clientNewCertificate = async(id) => { 
  let endpoint = `clientNewCertificate.php`;

  let urlParams = `?cid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const clientNewCertificatePdf = async(id) => { 
  let endpoint = `clientNewCertificatePdf.php`;

  let urlParams = `?lid=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const applicationCreateLink = async (info) => {
  let endpoint = `applicationCreateLink.php`;

  const postData = info
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const applicationCreateData = async (info) => {
  let endpoint = `applicationCreateData.php`;

  let urlParams = `?id=${info.id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const applicationCreatePdf = async (info) => {
  let endpoint = `applicationCreatePdf.php`;

  const postData = info
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}

export const documentUpload = async (form) => {
  let endpoint = `documentUpload.php`;

  let data = HTTP.POSTFORM(endpoint, form);

  return data;
}

export const documentDelete = async (form) => {
  let endpoint = `documentDelete.php`;

  let data = HTTP.POSTFORM(endpoint, form);

  return data;
}