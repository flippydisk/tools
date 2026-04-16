import responder from './responder';
import promise from './promise';
import Debug from '../debug/debug';

const debug = new Debug({ debug: false, control: 'Json:ajax' });

/**
 * @function ajax
 * @parent Json
 * @description a clean Ajax handler, setting options for fetch(). Optionally log errors utilizing the responder &
 * Debug features.
 *
 * @param {String} endpoint String URL to hit with the ajax request.
 * @param {Function} cb optional callback function
 * @param {Object} options override fetch options
 * @return {Function} cb optional callback function
 */
export default function ajax(endpoint = '', cb = undefined, options = {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
}) {
    const signature = {
        cb,
        name: 'fetchhandler',
        options,
        url: endpoint,
    };

    if (!endpoint) {
        const errorMessage = Object.assign(signature, {
            message: 'There is not a parameter for endpoint in this call',
        });

        return responder(errorMessage);
    }

    if (typeof cb !== 'function' && typeof cb !== 'undefined') {
        const errorMessage = Object.assign(signature, {
            message: `The cb parameter in this call has an expected typeof === 'function' or undefined, and instead it has a typeof ${typeof cb}`,
        });

        return responder(errorMessage);
    }

    return window.fetch(endpoint, options)
        .then((response) => {
            const { ok } = response;

            if (ok) {
                debug.log('ajax: fetch.then(): OK', ok, '\nresponse:', response);
                return response.json();
            }

            debug.log('ajax: NOT OK', ok);
            return promise(signature, response, true);
        })
        .then((data) => {
            if (typeof cb === 'function') return cb(data);
            debug.log('ajax: fetch.then() Resolve: data:', data);

            return data;
        })
        .catch(errorMessage => responder(errorMessage));
}
