import * as HTTP from './http';

export const Login = async(user, pass) => {
  let endpoint = `corporate/login.php`;

  let urlParams = `?user=${user}&pass=${pass}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const Companies = async() => {
  let endpoint = `corporate/companiesList.php`;

  let urlParams = ``;

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

export const CompaniesCreate = async(form) => {
  let endpoint = `corporate/companiesCreate.php`;

  let data = HTTP.POSTFORM(`${endpoint}`, form);

  return data;
}

export const CompaniesUpdate = async(form) => {
  let endpoint = `corporate/companiesUpdate.php`;

  let data = HTTP.POSTFORM(`${endpoint}`, form);

  return data;
}