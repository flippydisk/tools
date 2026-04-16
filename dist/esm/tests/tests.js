/**
 * @function testDefaults
 * @description Runs a set of default tests to check if the instance and all of its defined items
 * exist and are the correct type.
 */

function testDefaults(instance, items) {
    test('will provide defaults on initialization', () => {
        expect(instance).toBeDefined();
    });

    test('and its dependencies should be defined', () => {
        Object.keys(items).forEach((key) => {
            expect(items[key]).toBeDefined();
            expect(items[key].length).toBeGreaterThan(0);
            expect(Array.isArray(items[key])).toBeTruthy();

            items[key].forEach((item) => {
                expect(typeof item).toBe(key.toString());
            });
        });
    });
}

export { testDefaults };
