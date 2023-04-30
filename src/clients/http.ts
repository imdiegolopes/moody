interface HttpClientOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: any;
}

async function createHttpClient(httpClientOptions: HttpClientOptions) {
  const options = {
    method: httpClientOptions.method,
    headers: {
      'Content-Type': 'application/json',
      ...Headers,
    },
    body: null,
  } as any;

  if (httpClientOptions.data) {
    options.body = JSON.stringify(httpClientOptions.data);
  }

  try {
    const baseUrl = 'http://localhost:5000';
    const response = await fetch(`${baseUrl}${httpClientOptions.url}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export {
  createHttpClient,
}

