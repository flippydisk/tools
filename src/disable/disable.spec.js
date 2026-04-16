import * as Tests from '../tests/tests';
import Disable from './disable';

window.history.replaceState({}, '', '/?one=true&disable=DisableTest&more=false');

const disable = new Disable({ disable: false, control: 'DisableTest' }); // In URL Params
const fileDisable = new Disable({ disable: true, control: 'DisableTest2' }); // In File mode

const allItems = {
    function: [
        disable.constructor,
        disable.find,
        disable.setStatus,
        disable.isDisabled,
    ],
    object: [
        disable,
        fileDisable,
    ],
    string: [
        disable.param,
        disable.urlMode,
        disable.fileMode,
        disable.concatenator,
        disable.control,
    ],
    boolean: [
        disable.disabled,
        disable.isDisabled(),
        disable.setStatus({ disable: false, control: 'Test' }, null, null),
        disable.setStatus({ disable: false, control: 'Test' }, true, true),
        fileDisable.isDisabled(),
    ],
};

describe('Disable', () => {
    Tests.testDefaults(disable, allItems);

    test('be certain values', () => {
        expect(disable.disabled).toBeTruthy();
        expect(fileDisable.disabled).toBeTruthy();
        expect(disable.param).toBe('disable');
        expect(disable.urlMode).toBe('Enabling URL Disable mode for');
        expect(disable.fileMode).toBe('Enabling File Disable mode for');
        expect(disable.concatenator).toBe(':');
        expect(disable.control).toBe('DisableTest');
        expect(fileDisable.control).toBe('DisableTest2');
    });

    test('find() should be able to locate the disable param anywhere in the URL or control setting', () => {
        const decodeSearch = new URLSearchParams(window.location.search);
        const findDisabled = decodeSearch.getAll(disable.param);
        expect(disable.find(findDisabled, 'DisableTest')).toBeTruthy();
        expect(disable.find(findDisabled, 'DisableTest2')).toBeFalsy();
        expect(disable.find(findDisabled, 'RandomItem')).toBeFalsy();
    });

    test('setStatus() should be able decipher a Boolean result based on the settings', () => {
        disable.disabled = false;
        const isFalse = disable.setStatus({ disable: false, control: 'Test' }, null, null);
        const isTrue = disable.setStatus({ disable: false, control: 'DisableTest' }, true, true);
        disable.disabled = true;
        const hardTrue = disable.setStatus({ disable: true, control: 'Test' }, true, true);
        expect(isFalse).toBeFalsy();
        expect(isTrue).toBeTruthy();
        expect(hardTrue).toBeTruthy();
    });

    test('functions return Boolean false for valid and invalid cases', () => {
        expect(disable.isDisabled()).toBeTruthy();
        expect(fileDisable.isDisabled()).toBeTruthy();
    });
});
