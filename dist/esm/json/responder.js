import Debug from '../debug/debug.js';

const debug = new Debug({ debug: false, control: 'Responder' });

/**
 * @function responder
 * @parent Json
 * @description a clean Ajax response handler, optionally logged utilizing the Debug feature.
 *
 * @param {{status: string, statusText: string, message: string, rest: any}} arguments Ajax response information to
 * be logged. Only `message` is required, others are optional.
 * @return {Function} cb optional callback function
 */
const responder = ({
    status = '',
    statusText = '',
    message,
    ...rest
}) => {
    const errorDescriptor = status || statusText ? `${status} ${statusText}` : message;
    const moreInfo = rest.length >= 1 ? rest : 'general error';

    debug.error(errorDescriptor, moreInfo);

    return {
        errorDescriptor,
        moreInfo
    };
};

export default responder;
