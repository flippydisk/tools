const ajaxJson = 'https://jsonplaceholder.typicode.com/todos/1';
const badAjaxJson = 'https://jsonplaceholder.typicode.com/todos/234234242422';

const defaultBadResponse = {
    errorDescriptor: '404 Not Found',
    moreInfo: 'general error',
    cb: undefined,
    message: '404: Not Found, failure for call to ',
    name: 'fetchhandler',
    options: {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
    response: {
        size: 0,
        timeout: 0,
        body: {
            data: [
                123,
                34,
                101,
                114,
                114,
                111,
                114,
                68,
                101,
                115,
                99,
                114,
                105,
                112,
                116,
                111,
                114,
                34,
                58,
                34,
                52,
                48,
                52,
                32,
                78,
                111,
                116,
                32,
                70,
                111,
                117,
                110,
                100,
                34,
                44,
                34,
                109,
                111,
                114,
                101,
                73,
                110,
                102,
                111,
                34,
                58,
                34,
                103,
                101,
                110,
                101,
                114,
                97,
                108,
                32,
                101,
                114,
                114,
                111,
                114,
                34,
                125
            ],
            type: 'Buffer',
        },
        disturbed: false,
        error: null,
        internals: {
            counter: undefined,
            headers: {
                map: {
                    'Content-Type': ['text/plain;charset=UTF-8']
                },
            },
            status: 404,
            statusText: 'Not Found',
            url: undefined,
        }
    },
    status: 404,
    statusText: 'Not Found',
    url: badAjaxJson,
};

const goodResponse = {
    ok: true,
    status: 200,
    statusText: 'Success',
    url: ajaxJson
};

const badResponse = {
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: badAjaxJson
};

const goodData = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
};

const goodDataWithCallback = Object.assign(goodData, { thing: 'stuff' });

const cb = null;

const options = {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
};

const fullPromiseResolve = {
    cb,
    name: 'fetchhandler',
    options,
    url: null,
    message: `200: Success, successful call to ${ajaxJson}`,
    response: JSON.stringify(goodResponse),
    status: goodResponse.status,
    statusText: goodResponse.statusText
};

const fullPromiseRejection = {
    cb,
    name: 'fetchhandler',
    options,
    url: null,
    message: `404: Not Found, failed call to ${badAjaxJson}`,
    response: JSON.stringify(badResponse),
    status: badResponse.status,
    statusText: badResponse.statusText
};

const mockCallback = (stuff) => {
    const orig = { thing: 'stuff' };
    Object.assign(orig, stuff);
    return orig;
};

const signature = { cb, name: 'fetchhandler', options, url: null };

const errorResponse = {
    errorDescriptor: 'There is not a parameter for endpoint in this call',
    moreInfo: 'general error',
};

const noCallBackResponse = {
     
    errorDescriptor: `The cb parameter in this call has an expected typeof === 'function' or undefined, and instead it has a typeof object`,
    moreInfo: 'general error',
};

const noEndPoint = 'There is not a parameter for endpoint in this call';

const invalidCallBack = 'The cb parameter in this call has an expected typeof === \'function\' or undefined, and instead it has a typeof';

export {
    ajaxJson,
    badAjaxJson,
    defaultBadResponse,
    goodResponse,
    badResponse,
    goodData,
    goodDataWithCallback,
    cb,
    options,
    fullPromiseResolve,
    fullPromiseRejection,
    mockCallback,
    signature,
    errorResponse,
    noCallBackResponse,
    noEndPoint,
    invalidCallBack
};
