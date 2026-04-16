import * as Tests from '../tests/tests';
import Debug from './debug';

 
window.history.replaceState({}, '', '/?debug=DebugTest&debug=SecondDebugTest');

global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    table: jest.fn()
};

const firstDebug = new Debug({ debug: false, control: 'DebugTest' }); // In URL Params
const secondDebug = new Debug({ debug: false, control: 'SecondDebugTest' }); // In URL Params
const thirdDebug = new Debug({ debug: false, control: 'ThirdDebugTest' }); // Not set
const trueDebug = new Debug({ debug: true, control: 'TrueDebugTest' }); // Hard set to true
const customDebug = new Debug({ // Custom options overrides
    debug: true,
    control: 'CustomDebug',
    param: 'debugger',
    urlMode: 'URL mode',
    fileMode: 'File mode',
    debugAll: 'DebugAll',
    concatenator: ' - '
});

const allItems = {
    function: [
        firstDebug.constructor,
        firstDebug.setOptions,
        firstDebug.config,
        firstDebug.sort,
        firstDebug.find,
        firstDebug.logFactory,
        firstDebug.log,
        firstDebug.warn,
        firstDebug.error,
        firstDebug.info,
        firstDebug.debug,
        firstDebug.table,
        firstDebug.trace,
        firstDebug.printIt
    ],
    object: [
        firstDebug.options,
    ],
    string: [
        firstDebug.options.control,
        firstDebug.options.param,
        firstDebug.options.urlMode,
        firstDebug.options.fileMode,
        firstDebug.options.debugAll,
        firstDebug.options.concatenator
    ],
    boolean: [
        firstDebug.options.debug
    ]
};

describe('Debug', () => {
    Tests.testDefaults(firstDebug, allItems);

    test('will have default options with certain values', () => {
        expect(firstDebug.options.debug).toBeTruthy();
        expect(secondDebug.options.debug).toBeTruthy();
        expect(thirdDebug.options.debug).toBeFalsy();
        expect(trueDebug.options.debug).toBeTruthy();
        expect(firstDebug.options.param).toBe('debug');
        expect(firstDebug.options.urlMode).toBe('Enabling URL Debug mode for');
        expect(firstDebug.options.fileMode).toBe('Enabling File Debug mode for');
        expect(firstDebug.options.debugAll).toBe('All');
        expect(firstDebug.options.concatenator).toBe(':');
        expect(firstDebug.options.control).toBe('DebugTest');
        expect(secondDebug.options.control).toBe('SecondDebugTest');
        expect(thirdDebug.options.control).toBe('ThirdDebugTest');
        expect(trueDebug.options.control).toBe('TrueDebugTest');
    });

    test('will let you override the default options with custom values', () => {
        expect(customDebug.options.control).toBe('CustomDebug');
        expect(customDebug.options.debug).toBeTruthy();
        expect(customDebug.options.param).toBe('debugger');
        expect(customDebug.options.urlMode).toBe('URL mode');
        expect(customDebug.options.fileMode).toBe('File mode');
        expect(customDebug.options.debugAll).toBe('DebugAll');
        expect(customDebug.options.concatenator).toBe(' - ');
    });

    test('should have functions return null, or false respectively, for invalid cases', () => {
        expect(firstDebug.log()).toBeNull();
        expect(firstDebug.warn()).toBeNull();
        expect(firstDebug.error()).toBeNull();
        expect(firstDebug.info()).toBeNull();
        expect(firstDebug.debug()).toBeNull();
        expect(firstDebug.table()).toBeNull();
        expect(firstDebug.printIt()).toBeFalsy();
        expect(firstDebug.printIt(true)).toBeFalsy();
    });

    test('should have functions return Boolean true for valid uses', () => {
        expect(firstDebug.log(true)).toBeTruthy();
        expect(firstDebug.warn(true)).toBeTruthy();
        expect(firstDebug.error(true)).toBeTruthy();
        expect(firstDebug.info(true)).toBeTruthy();
        expect(firstDebug.debug(true)).toBeTruthy();
        expect(firstDebug.table(true)).toBeTruthy();
    });

    test('should have logFactory() return the valid printIt() console method, and not null', () => {
        expect(firstDebug.logFactory('log')).not.toBeNull();
        expect(console.log).toHaveBeenCalled();
        expect(firstDebug.logFactory('warn')).not.toBeNull();
        expect(console.warn).toHaveBeenCalled();
        expect(firstDebug.logFactory('error')).not.toBeNull();
        expect(console.error).toHaveBeenCalled();
        expect(firstDebug.logFactory('info')).not.toBeNull();
        expect(console.info).toHaveBeenCalled();
        expect(firstDebug.logFactory('debug')).not.toBeNull();
        expect(console.debug).toHaveBeenCalled();
        expect(firstDebug.logFactory('table')).not.toBeNull();
        expect(console.table).toHaveBeenCalled();
        expect(firstDebug.logFactory('nothing')).not.toBeNull(); // Defaults to console.log in printIt()
        expect(console.log).toHaveBeenCalled();
    });

    test('should have printIt() use the proper logger', () => {
        expect(firstDebug.printIt('log', [true])).toBeTruthy();
        expect(console.log).toHaveBeenCalled();
        expect(firstDebug.printIt('warn', [true])).toBeTruthy();
        expect(console.warn).toHaveBeenCalled();
        expect(firstDebug.printIt('error', [true])).toBeTruthy();
        expect(console.error).toHaveBeenCalled();
        expect(firstDebug.printIt('info', [true])).toBeTruthy();
        expect(console.info).toHaveBeenCalled();
        expect(firstDebug.printIt('debug', [true])).toBeTruthy();
        expect(console.debug).toHaveBeenCalled();
        expect(firstDebug.printIt('table', [true])).toBeTruthy();
        expect(console.table).toHaveBeenCalled();
        expect(firstDebug.printIt('default', [true])).toBeTruthy();
        expect(console.log).toHaveBeenCalled();
    });

    test('should have find() be able to locate the debug param anywhere in the URL or control setting', () => {
        const decodeSearch = new URLSearchParams(window.location.search);
        const findDebugs = decodeSearch.getAll(firstDebug.options.param);
        expect(firstDebug.find(findDebugs, 'DebugTest')).toBeTruthy();
        expect(firstDebug.find(findDebugs, 'SecondDebugTest')).toBeTruthy();
        expect(firstDebug.find(findDebugs, 'ThirdDebugTest')).toBeFalsy();
        expect(firstDebug.find(findDebugs, 'TrueDebugTest')).toBeFalsy();
    });
});
