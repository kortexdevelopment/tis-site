const developmentServer = 'https://truckinsurancesolutions.org/system/functions/api/';
const API_URL = developmentServer;

export const GET = async (endpoint) => {
  let requestEndpoint = endpoint;

  console.log(`${API_URL}${requestEndpoint}`);

  let response = await fetch(`${API_URL}${requestEndpoint}`);

  if (!response.ok){
     throw new Error(`HTTP_NOT_OK: ${await response.text()}`);
  }

  let json = await response.json();
  return json;
}

export const POST = async (endpoint, postData) => {
  let url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error(`HTTP_NOT_OK, ${url}, ${JSON.stringify(postData)}, ${await response.text()}`);
  }

  let json = response.json();

  return json;
}

export const POSTFORM = async (endpoint, formData) => {
  let url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP_NOT_OK, ${url}, ${await response.text()}`);
  }

  let json = response.json();

  return json;
}