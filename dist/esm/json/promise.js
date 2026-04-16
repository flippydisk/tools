/**
 * @function promise
 * @parent Json
 * @description an Ajax error response handler. Internal to Json only.
 *
 * @param {Object} signature Error message setup info
 * @param {Function} response AJax data that fetch got
 * @param {Boolean} reject otherwise resolve
 * @return {Promise} A Promise resolution or rejection with the data, status
 */
export default function promise(signature, response, reject = false) {
    const { status, statusText, url } = response;
    const messageType = (reject) ? 'failed' : 'successful';

    const info = Object.assign(signature, {
        response: JSON.stringify(response),
        message: `${status}: ${statusText}, ${messageType} call to ${url}`,
        status,
        statusText
    });

    if (reject) return Promise.reject(info).catch(error => error);
    return Promise.resolve(info).catch(error => error);
}
