const HttpPostMethodWithBody = async (url, BodyParams) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + "mytoken",
      },
      body: JSON.stringify(BodyParams),
    };
    try {
      let response = await fetch(url, requestOptions);
      let json = await response.json();
      return json;
    } catch (error) {
      let response
          console.log(error, 'errorerrorHttpPostMethodWithBody')
          return response;
    }
  }

  const httpGetMethod = async (url, token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };
    try {
        let response = await fetch(url, requestOptions);
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.indexOf('application/json') !== -1) {
            let json = await response.json();
            return json; // Return parsed JSON object
        } else {
            return await response.text(); // Return raw text if not JSON
        }
    } catch (err) {
        console.error('get method catch err', err);
        throw err; // Re-throw error to handle it further
    }
};

  export {
    HttpPostMethodWithBody,
    httpGetMethod
  }