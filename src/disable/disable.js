/**
 * @page Disable
 * @description A feature flag tool to disable a script or a setting via a URL param
 * @module class Disable
 * @parent @flippydisk/tools
 */

import Debug from '../debug/debug';
import isEmptyString from '../lang/isEmptyString';

const debug = new Debug({ debug: false, control: 'Disable' });

export default class Disable {
    param = 'disable';

    urlMode = 'Enabling URL Disable mode for';

    fileMode = 'Enabling File Disable mode for';

    concatenator = ':';

    /**
     * @function constructor
     * @description initializing Disable constructor
     * @parent Disable
     * @param properties.disable {Boolean} Default file-based trigger for turning this on or off on instantiation
     * @param properties.control {String} Name given to this calling script so it can be used as a URL param
     */
    constructor(properties = {}) {
        const hasControl = !isEmptyString(properties.control);
        const isDisabledOnLoad = (
            properties.disable !== undefined &&
            typeof properties.disable === 'boolean')
            ? properties.disable
            : false;
        const decodeSearch = new URLSearchParams(window.location.search);
        this.disabled = isDisabledOnLoad;
        this.control = hasControl ? properties.control : '';
        const findDisabled = decodeSearch.getAll(this.param);
        const isDisabled = decodeSearch.has(this.param);
        const inUrl = hasControl &&
            isDisabled &&
            this.find(findDisabled, properties.control);

        this.setStatus(properties, inUrl, hasControl);
    }

    /**
     * @function find
     * @description Search all cases of dexter:disable in the search params and match them with the control name.
     * @param findDisabled {Array} List of disabled params
     * @param param {String} Control name to search for
     * @parent Disable
     * @return {Boolean} True or False if it's matched the param
     */
    find(findDisabled, param) {
        debug.log('find:', 'Looking for', param, 'in', findDisabled);
        return findDisabled.some(v => v === param);
    }

    /**
     * @function setStatus
     * @description Checks the conditions to which we should disable the feature
     * @param properties {Object} List of disabled params
     * @param inUrl {Boolean} If this.param was found in the URL
     * @param hasControl {Boolean} if properties.control was properly set
     * @parent Disable
     * @return {Boolean} True or False if we're disabling the feature
     */
    setStatus(properties, inUrl, hasControl) {
        if (this.disabled) {
            debug.info(this.fileMode, properties.control);
            return true;
        }

        if (!properties.disable && inUrl) {
            this.disabled = true;
            debug.info(this.urlMode, properties.control);
            return true;
        }

        if (properties.disable && hasControl) {
            this.disabled = true;
            debug.info(this.fileMode, properties.control);
            return true;
        }

        return false;
    }

    /**
     * @function isDisabled
     * @description Returns a Boolean value for calling scripts to take action to disable a script or setting
     * @parent Disable
     * @return {Boolean} Returns this.options.disabled
     */
    isDisabled() {
        debug.log('isDisabled:', this.disabled);
        return this.disabled;
    }
}
