import * as Tests from '../tests/tests';
import * as Lang from './lang';

const allItems = {
    function: [
        Lang.filterHTMLTags,
        Lang.getPropertySafely,
        Lang.getStringSafely,
        Lang.isEmptyString,
        Lang.isEmptyObject,
        Lang.isNull,
        Lang.isNullish,
        Lang.isNumber,
        Lang.isObject,
        Lang.isStringy,
        Lang.isType,
        Lang.isUndefined,
        Lang.isValidObject,
    ],
};

const items = {
    date: new Date(),
    dateString: '2021-01-01',
    emptyString: '',
    fullString: 'how now brown cow',
    num: 1,
    numString: '1',
    isTrue: true,
    isFalse: false,
    stringTrue: 'true',
    stringFalse: 'false',
    emptyObj: {},
    fullObj: {
        one: 'thing',
        toString: thing => JSON.stringify(thing)
    },
    secondFullObj: {
        two: 'things',
    },
    emptyArray: [],
    fullArray: ['one'],
    und: undefined,
    nul: null,
    html: '<a href="flippydisk.com" class="MyClass">The words I want &amp; more.</a>',
     
    symbol: Symbol(),
    func: function x() {},
};

describe('Lang', () => {
    Tests.testDefaults(Lang, allItems);

    describe('functions should always return the correct result.', () => {
        test('filterHTMLTags should return a string without any HTML tags', () => {
            expect(Lang.filterHTMLTags(items.html)).toBe('The words I want &amp; more.');
        });

        test('isEmptyString should return Boolean', () => {
            expect(Lang.isEmptyString(items.emptyString)).toBeTruthy();
            expect(Lang.isEmptyString(items.fullString)).toBeFalsy();
            expect(Lang.isEmptyString(items.num)).toBeFalsy();
            expect(Lang.isEmptyString(items.isTrue)).toBeFalsy();
            expect(Lang.isEmptyString(items.isFalse)).toBeFalsy();
            expect(Lang.isEmptyString(items.emptyObj)).toBeFalsy();
            expect(Lang.isEmptyString(items.fullObj)).toBeFalsy();
            expect(Lang.isEmptyString(items.emptyArray)).toBeFalsy();
            expect(Lang.isEmptyString(items.fullArray)).toBeFalsy();
            expect(Lang.isEmptyString(items.und)).toBeFalsy();
            expect(Lang.isEmptyString(items.nul)).toBeFalsy();
        });

        test('isUndefined should return Boolean', () => {
            expect(Lang.isUndefined(items.emptyString)).toBeFalsy();
            expect(Lang.isUndefined(items.fullString)).toBeFalsy();
            expect(Lang.isUndefined(items.num)).toBeFalsy();
            expect(Lang.isUndefined(items.isTrue)).toBeFalsy();
            expect(Lang.isUndefined(items.isFalse)).toBeFalsy();
            expect(Lang.isUndefined(items.emptyObj)).toBeFalsy();
            expect(Lang.isUndefined(items.fullObj)).toBeFalsy();
            expect(Lang.isUndefined(items.emptyArray)).toBeFalsy();
            expect(Lang.isUndefined(items.fullArray)).toBeFalsy();
            expect(Lang.isUndefined(items.und)).toBeTruthy();
            expect(Lang.isUndefined(items.nul)).toBeFalsy();
        });

        test('isNumber should return Boolean', () => {
            expect(Lang.isNumber(items.emptyString)).toBeFalsy();
            expect(Lang.isNumber(items.fullString)).toBeFalsy();
            expect(Lang.isNumber(items.num)).toBeTruthy();
            expect(Lang.isNumber(items.isTrue)).toBeFalsy();
            expect(Lang.isNumber(items.isFalse)).toBeFalsy();
            expect(Lang.isNumber(items.emptyObj)).toBeFalsy();
            expect(Lang.isNumber(items.fullObj)).toBeFalsy();
            expect(Lang.isNumber(items.emptyArray)).toBeFalsy();
            expect(Lang.isNumber(items.fullArray)).toBeFalsy();
            expect(Lang.isNumber(items.und)).toBeFalsy();
            expect(Lang.isNumber(items.nul)).toBeFalsy();
        });

        test('isNull should return Boolean', () => {
            expect(Lang.isNull(items.emptyString)).toBeFalsy();
            expect(Lang.isNull(items.fullString)).toBeFalsy();
            expect(Lang.isNull(items.num)).toBeFalsy();
            expect(Lang.isNull(items.isTrue)).toBeFalsy();
            expect(Lang.isNull(items.isFalse)).toBeFalsy();
            expect(Lang.isNull(items.emptyObj)).toBeFalsy();
            expect(Lang.isNull(items.fullObj)).toBeFalsy();
            expect(Lang.isNull(items.emptyArray)).toBeFalsy();
            expect(Lang.isNull(items.fullArray)).toBeFalsy();
            expect(Lang.isNull(items.und)).toBeFalsy();
            expect(Lang.isNull(items.nul)).toBeTruthy();
        });

        test('isNullish should return Boolean with the leeway of also checking for null, undefined, NaN and empty strings', () => {
            expect(Lang.isNullish(items.emptyString)).toBeTruthy();
            expect(Lang.isNullish(items.fullString)).toBeFalsy();
            expect(Lang.isNullish(items.num)).toBeFalsy();
            expect(Lang.isNullish(items.isTrue)).toBeFalsy();
            expect(Lang.isNullish(items.isFalse)).toBeFalsy();
            expect(Lang.isNullish(items.emptyObj)).toBeFalsy();
            expect(Lang.isNullish(items.fullObj)).toBeFalsy();
            expect(Lang.isNullish(items.emptyArray)).toBeFalsy();
            expect(Lang.isNullish(items.fullArray)).toBeFalsy();
            expect(Lang.isNullish(items.und)).toBeTruthy();
            expect(Lang.isNullish(items.nul)).toBeTruthy();
        });

        test('getStringSafely should return the string if it can decipher it, or null if it cant', () => {
            expect(Lang.getStringSafely(items.emptyString)).toBe('');
            expect(Lang.getStringSafely(items.fullString)).toBe('how now brown cow');
            expect(Lang.getStringSafely(items.num)).toBe('1');
            expect(Lang.getStringSafely(items.isTrue)).toBe('true');
            expect(Lang.getStringSafely(items.isFalse)).toBe('false');
            expect(Lang.getStringSafely(items.stringTrue)).toBe('true');
            expect(Lang.getStringSafely(items.stringFalse)).toBe('false');
            expect(Lang.getStringSafely(items.fullArray)).toBe('["one"]');
            expect(Lang.getStringSafely(items.und)).toBe(null);
            expect(Lang.getStringSafely(items.nul)).toBe(null);
            expect(Lang.getStringSafely(items.fullObj)).toBe('{"one":"thing"}');
            expect(Lang.getStringSafely(items.emptyObj)).toBe('{}');
            expect(Lang.getStringSafely(items.emptyArray)).toBe('[]');
            expect(Lang.getStringSafely(items.func)).toBe(null);
        });

        test('isStringy should return the string if it can decipher it, or null if it cant', () => {
            expect(Lang.isStringy(items.emptyString)).toBeTruthy();
            expect(Lang.isStringy(items.fullString)).toBeTruthy();
            expect(Lang.isStringy(items.num)).toBeTruthy();
            expect(Lang.isStringy(items.isTrue)).toBeTruthy();
            expect(Lang.isStringy(items.isFalse)).toBeTruthy();
            expect(Lang.isStringy(items.stringTrue)).toBeTruthy();
            expect(Lang.isStringy(items.stringFalse)).toBeTruthy();
            expect(Lang.isStringy(items.emptyObj)).toBeTruthy();
            expect(Lang.isStringy(items.fullObj)).toBeTruthy();
            expect(Lang.isStringy(items.emptyArray)).toBeTruthy();
            expect(Lang.isStringy(items.fullArray)).toBeTruthy();
            expect(Lang.isStringy(items.und)).toBeFalsy();
            expect(Lang.isStringy(items.nul)).toBeFalsy();
        });

        test('isEmptyObject should return a boolean value', () => {
            expect(Lang.isEmptyObject(items.emptyObj)).toBeTruthy();
            expect(Lang.isEmptyObject(items.fullObj)).toBeFalsy();
            expect(Lang.isEmptyObject(items.emptyArray)).toBeTruthy();
            expect(Lang.isEmptyObject(items.fullArray)).toBeFalsy();
            expect(Lang.isEmptyObject(items.und)).toBeTruthy();
            expect(Lang.isEmptyObject(items.nul)).toBeTruthy();
        });

        test('isType should return the correct Boolean for a type match, or lack thereof', () => {
            expect(Lang.isType(/Date/, items.date)).toBeTruthy();
            expect(Lang.isType(/Date/, items.dateString)).toBeFalsy();
            expect(Lang.isType(/String/, items.numString)).toBeTruthy();
            expect(Lang.isType(/String/, items.num)).toBeFalsy();
            expect(Lang.isType(/Number/, items.num)).toBeTruthy();
            expect(Lang.isType(/Number/, items.numString)).toBeFalsy();
            expect(Lang.isType(/Number/, parseInt(items.numString, 10))).toBeTruthy();
            expect(Lang.isType(/Object/, items.fullObj)).toBeTruthy();
            expect(Lang.isType(/Object/, items.fullArray)).toBeFalsy();
            expect(Lang.isType(/Object/, items.emptyObj)).toBeTruthy();
            expect(Lang.isType(/Object/, items.dateString)).toBeFalsy();
            expect(Lang.isType(/Array/, items.fullArray)).toBeTruthy();
            expect(Lang.isType(/Array/, items.fullString)).toBeFalsy();
            expect(Lang.isType(/Array/, items.fullObj)).toBeFalsy();
            expect(Lang.isType(/Function/, items.func)).toBeTruthy();
            expect(Lang.isType(/Function/, items.und)).toBeFalsy();
            expect(Lang.isType(/Function/, items.nul)).toBeFalsy();
            expect(Lang.isType(/Boolean/, items.isTrue)).toBeTruthy();
            expect(Lang.isType(/Boolean/, items.isFalse)).toBeTruthy();
            expect(Lang.isType(/Boolean/, items.stringTrue)).toBeFalsy();
            expect(Lang.isType(/Boolean/, items.stringFalse)).toBeFalsy();
            expect(Lang.isType(/Boolean/, (items.stringTrue === 'true'))).toBeTruthy();
            expect(Lang.isType(/Boolean/, (items.stringFalse === 'false'))).toBeTruthy();
        });

        test('returns true for [object Object] elements including empty {}', () => {
            expect(Lang.isObject(items.string)).toBe(false);
            expect(Lang.isObject(items.isTrue)).toBe(false);
            expect(Lang.isObject(items.isFalse)).toBe(false);

            expect(Lang.isObject(items.und)).toBe(false);
            expect(Lang.isObject(items.symbol)).toBe(false);
            expect(Lang.isObject(items.func)).toBe(false);
            expect(Lang.isObject(items.num)).toBe(false);
            expect(Lang.isObject(items.nul)).toBe(false);
            expect(Lang.isObject(items.emptyArray)).toBe(false);

            expect(Lang.isObject(items.emptyObj)).toBe(true);
            expect(Lang.isObject(items.fullObj)).toBe(true);
        });

        test('returns true for [object Object] elements with at least 1 property', () => {
            expect(Lang.isValidObject(items.string)).toBe(false);
            expect(Lang.isValidObject(items.isTrue)).toBe(false);
            expect(Lang.isValidObject(items.isFalse)).toBe(false);

            expect(Lang.isValidObject(items.und)).toBe(false);
            expect(Lang.isValidObject(items.symbol)).toBe(false);
            expect(Lang.isValidObject(items.func)).toBe(false);
            expect(Lang.isValidObject(items.num)).toBe(false);
            expect(Lang.isValidObject(items.nul)).toBe(false);
            expect(Lang.isValidObject(items.emptyArray)).toBe(false);

            expect(Lang.isValidObject(items.emptyObj)).toBe(false);
            expect(Lang.isValidObject(items.fullObj)).toBe(true);
        });
    });
});

describe('Single level deep', () => {
    test('should get a property', () => {
        const o = {
            myProp: 'a',
        };
        expect(Lang.getPropertySafely(o, 'myProp')).toBe('a');
    });

    test('should return undefined for a missing property', () => {
        const o = {
            myProp: 'a',
        };
        expect(Lang.getPropertySafely(o, 'notThere')).toBeUndefined();
    });

    test('should return a defined property that is null || undefined', () => {
        const o = {
            myProp: 'a',
            isUndefined: undefined,
            isNull: null,
            isNaN: NaN,
        };
        expect(Lang.getPropertySafely(o, 'myProp')).toBe('a');
        expect(Lang.getPropertySafely(o, 'isUndefined')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'isNull')).toBeNull();
        expect(Lang.getPropertySafely(o, 'isNaN')).toBeNaN();
    });
});

describe('Two levels deep', () => {
    test('should get a property', () => {
        const o = {
            two: {
                myProp: 'a',
            },
        };
        expect(Lang.getPropertySafely(o, 'two.myProp')).toBe('a');
    });

    test('should return undefined for a missing property', () => {
        const o = {
            two: {
                myProp: 'a',
            },
        };
        expect(Lang.getPropertySafely(o, 'two.notThere')).toBeUndefined();
    });

    test('should return undefined if the first object does not exist', () => {
        const o = {
            two: {
                myProp: 'a',
            },
        };
        expect(Lang.getPropertySafely(o, 'notThere.myProp')).toBeUndefined();
    });

    test('should return object value if the object is null, undefined, NaN', () => {
        const o = {
            two: {
                isUndefined: undefined,
                isNull: null,
                isNaN: NaN,
            },
        };
        expect(Lang.getPropertySafely(o, 'two.isUndefined')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.isNull')).toBeNull();
        expect(Lang.getPropertySafely(o, 'two.isNaN')).toBeNaN();
    });

    test('should return a undefined for a nested property after null || undefined || NaN', () => {
        const o = {
            two: {
                myProp: 'a',
                isUndefined: undefined,
                isNull: null,
                isNaN: NaN,
            },
        };
        expect(Lang.getPropertySafely(o, 'two.myProp.notThere')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.isUndefined.notThere')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.isNull.notThere')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.isNaN.notThere')).toBeUndefined();
    });

    test('should return a defined property that is null || undefined', () => {
        const o = {
            two: {
                myProp: 'a',
                isUndefined: undefined,
                isNull: null,
                isNaN: NaN,
            },
        };
        expect(Lang.getPropertySafely(o, 'two.myProp')).toBe('a');
        expect(Lang.getPropertySafely(o, 'two.isUndefined')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.isNull')).toBeNull();
        expect(Lang.getPropertySafely(o, 'two.isNaN')).toBeNaN();
    });
});

describe('Three+ levels deep', () => {
    test('should get a property', () => {
        const o = {
            one: {
                two: {
                    three: {
                        myProp: 'a',
                    },
                },
            },
        };
        expect(Lang.getPropertySafely(o, 'one.two.three.myProp')).toBe('a');
    });

    test('should return undefined for a missing property', () => {
        const o = {
            one: {
                two: {
                    three: {
                        myProp: 'a',
                    },
                },
            },
        };
        expect(Lang.getPropertySafely(o, 'one.two.three.notThere')).toBeUndefined();
    });

    test('should return undefined if the middle object does not exist', () => {
        const o = {
            two: {
                myProp: 'a',
            },
        };
        expect(Lang.getPropertySafely(o, 'two.notThere.myProp')).toBeUndefined();
    });

    test('should return undefined if middle obj is null, undefined, NaN', () => {
        const o = {
            one: {
                two: {
                    three: {
                        isUndefined: undefined,
                        isNull: null,
                        isNan: NaN,
                    },
                },
            },
        };
        expect(Lang.getPropertySafely(o, 'one.two.three.isUndefined.myProp')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'one.two.three.isNull.myProp')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'one.two.three.isNaN.myProp')).toBeUndefined();
    });

    test('should return a defined property that is null || undefined', () => {
        const o = {
            two: {
                three: {
                    myProp: 'a',
                    isUndefined: undefined,
                    isNull: null,
                    isNaN: NaN,
                },
            },
        };
        expect(Lang.getPropertySafely(o, 'two.three.myProp')).toBe('a');
        expect(Lang.getPropertySafely(o, 'two.three.isUndefined')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'two.three.isNull')).toBeNull();
        expect(Lang.getPropertySafely(o, 'two.three.isNaN')).toBeNaN();
    });
});

describe('Error conditions', () => {
    test('should return undefined', () => {
        const o = {
            one: {
                two: {
                    three: {
                        myProp: 'a',
                    },
                },
            },
        };
        expect(Lang.getPropertySafely(o, '.one')).toBeUndefined();
        expect(Lang.getPropertySafely(o, '..one')).toBeUndefined();
        expect(Lang.getPropertySafely(o, '...one')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'one..two')).toBeUndefined();
        expect(Lang.getPropertySafely(o, '.one..two')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'one.two..three')).toBeUndefined();
        expect(Lang.getPropertySafely(o, 'one.two.three.myProp.')).toBeUndefined();
    });

    test('should return undefined if invalid objects passed in', () => {
        expect(Lang.getPropertySafely({}, 'a.v.d')).toBeUndefined();
        expect(Lang.getPropertySafely(undefined, 'a.v.d')).toBeUndefined();
        expect(Lang.getPropertySafely(null, 'a.v.d')).toBeUndefined();
        expect(Lang.getPropertySafely(NaN, 'a.v.d')).toBeUndefined();
        const str = 'hello';
        expect(Lang.getPropertySafely(str, 'a.v.d')).toBeUndefined();
        expect(Lang.getPropertySafely(123, 'a.v.d')).toBeUndefined();
        const myFunc = () => 'hello';
        expect(Lang.getPropertySafely(myFunc, 'a.v.d')).toBeUndefined();
    });
});
