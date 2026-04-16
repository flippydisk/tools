/**
 * @page Debug
 * @description Console debugger for optionally logging step by step progress.
 * Can be used with a {debug: true} in the instantiating call, or by URL parameter.
 * Setup: const debug = new Debug({debug: false, control: 'Game'});
 * @module class Debug
 * @parent @flippydisk/tools
 */

class Debug {
    /**
     * @function constructor
     * @description initializing Debug constructor
     * @parent Debug
     * @param options {Object} { debug, control, param, urlMode, fileMode, debugAll, concatenator }
     * See this.setOptions() for options{} properties and description.
     */
    constructor(options = {}) {
        this.options = this.setOptions(options);
        const config = this.config();
        const sortOptions = this.sort(config);

        this.info(sortOptions.mode, sortOptions.type);
    }

    /**
     * @function setOptions
     * @description Setup for all the debugging options
     * @param options {Object} {
     *     debug: Boolean,
     *     control: String,
     *     param: String,
     *     urlMode: String,
     *     fileMode: String,
     *     debugAll: String,
     *     concatenator: String
     * }
     * @parent Debug
     * @return {Object} The options object with instantiated overrides, or the defaults.
     */
    setOptions(options = {}) {
        return {
            debug: options.debug || false,
            control: options.control || '',
            param: options.param || 'debug',
            urlMode: options.urlMode || 'Enabling URL Debug mode for',
            fileMode: options.fileMode || 'Enabling File Debug mode for',
            debugAll: options.debugAll || 'All',
            concatenator: options.concatenator || ':'
        };
    }

    /**
     * @function config
     * @description Setup for all the URL vs. File based debugging options
     * @parent Debug
     * @return {Object} { all: Boolean, url: Boolean, local: Boolean }
     */
    config() {
        const hasControl = this.options.control !== '';
        const hasWindow = typeof window !== 'undefined' && window.location;
        const search = hasWindow ? window.location.search : null;
        const decodeSearch = (search) ? new URLSearchParams(search) : null;
        if (!decodeSearch) {
            this.error('Debug config(): could not find window.location.search:', decodeSearch);
            return false;
        }
        const findDebugs = decodeSearch.getAll(this.options.param);
        const isDebug = decodeSearch.has(this.options.param);
        const allInUrl = hasControl && isDebug && this.find(findDebugs, this.options.debugAll);
        const inUrl = hasControl && isDebug && this.find(findDebugs, this.options.control);
        return {
            all: !this.options.debug && allInUrl && !inUrl,
            url: !this.options.debug && inUrl && !allInUrl,
            local: this.options.debug && hasControl
        };
    }

    /**
     * @function sort
     * @description Parse all options and return the proper scenario for debugging
     * @param scenario {Object} { all, url, local } from this.config()
     * @parent Debug
     * @return {Object} { mode: Boolean, type: Boolean }
     */
    sort(scenario) {
        if (scenario.all || scenario.url || scenario.local) { this.options.debug = true; }
        if (scenario.all) { return { mode: this.options.urlMode, type: this.options.debugAll }; }
        if (scenario.url) { return { mode: this.options.urlMode, type: this.options.control }; }
        if (scenario.local) { return { mode: this.options.fileMode, type: this.options.control }; }
        return { mode: this.options.fileMode, type: this.options.debugAll };
    }

    /**
     * @function find
     * @description Search all cases of dexter:debug in the search params and match them
     * with the control name.
     *
     * @param findDebugs {Array} List of debug params
     * @param param {String} Control name to search for
     * @parent Debug
     *
     * @return {Boolean} True or False if it's matched the param
     */
    find(findDebugs, param) { return findDebugs.some(v => v === param); }

    /**
     * @function logFactory
     * @description Take a type and console out that type to this.printIt()
     * @param logType {String} log, warn, error, info, table, debug
     * @param ...log {Array} Implicit arguments cast from the logger functions
     * @parent Debug
     * @return {Function | null} Returns this.printIt
     */
     
    logFactory(logType) { return (...log) => (log.length ? this.printIt(logType, log) : null); }

    /**
     * @function log
     * @description console.log output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    log = this.logFactory('log');

    /**
     * @function warn
     * @description console.warn output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    warn = this.logFactory('warn');

    /**
     * @function error
     * @description console.error output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    error = this.logFactory('error');

    /**
     * @function info
     * @description console.info output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    info = this.logFactory('info');

    /**
     * @function debug
     * @description console.debug output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    debug = this.logFactory('debug');

    /**
     * @function table
     * @description console.table output
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    table = this.logFactory('table');

    /**
     * @function trace
     * @description console.trace output
     * @param log {Array | Object} Accepts any number of arguments of any type.
     * @parent Debug
     * @return {Function} Returns this.logFactory with the type
     */
    trace = this.logFactory('trace');

    /**
     * @function printIt
     * @description Prints the output to the console via the methods chosen
     * @param type {String} Type of logger to use
     * @param log {String | Array | Object} Accepts any number of arguments of any type.
     * @parent Debug
     * @return {Function} Executes console.log, etc. via .apply() with the options chosen
     */
    printIt(type, log) {
        let logger;
        let output;

         
        switch (type) {
            case 'error':
                logger = console.error;
                break;
            case 'warn':
                logger = console.warn;
                break;
            case 'log':
                logger = console.log;
                break;
            case 'info':
                logger = console.info;
                break;
            case 'debug':
                logger = console.debug;
                break;
            case 'table':
                logger = console.table;
                break;
            default:
                logger = console.log;
                break;
        }
         

        if (type === undefined || log === undefined || !this.options.debug) return false;
        // Place control tag as first array item
        output = [`${this.options.control}${this.options.concatenator}`];
        log.forEach((val) => { output.push(val); });

        // Flatten the array once for output
        output = [].concat.apply(output);
        // pass the log array as arguments to console.*
        logger.apply(console, output);

        return true;
    }
}

module.exports = Debug;
module.exports.default = Debug;
