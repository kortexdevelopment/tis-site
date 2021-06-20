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