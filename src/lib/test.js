exports.verifyLogin = async(user, pass) => {
  let endpoint = `agencyLogin.php`;

  let urlParams = `?user=${user}&pass=${pass}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}