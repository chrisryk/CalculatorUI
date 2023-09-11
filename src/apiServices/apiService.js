const apiUrl = 'https://localhost:5000';

export const postData = async (path = '', data = {}) => {
  const url = apiUrl + path;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    return response.text().then((errorMessage) => {
      throw new Error(errorMessage);
    });
  }
};

export const getData = async (path = '') => {
  const url = apiUrl + path;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  if (response.ok) {
    return response.json();
  } else {
    return response.text().then((errorMessage) => {
      throw new Error(errorMessage);
    });
  }
};
