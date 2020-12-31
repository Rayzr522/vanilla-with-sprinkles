
/**
 * Throws an error if the given condition is false
 * 
 * @param {*} condition The condition to check
 * @param {string} error The error message to show
 * @param {(message?: string) => Error} [type=Error]
 * @returns {void}
 */
const assert = (condition, error, type = Error) => {
    if (typeof error !== 'string') {
        throw new TypeError('error must be a string');
    }

    if (type !== Error && (!type || !type.__proto__ || type.__proto__.name !== 'Error')) {
        throw new TypeError('type must be an instance of Error')
    }

    if (!condition) {
        throw new type(error);
    }
};

/**
 * Asserts that a value is of a certain type, throws a TypeError if it is not
 * 
 * @param {!string} name The name to use
 * @param {string|object} type The type to expect, uses`typeof` if type is a string, and`instanceof` if type is a class
 * @returns {void}
 */
const assertType = (name, value, type) => {
    assert(typeof name === 'string', 'name must be a string', TypeError);
    if (typeof type === 'string') {
        assert(typeof value === type, `${name} must be a ${type}`, TypeError);
    } else if (typeof type === 'function' && type.prototype) {
        assert(value instanceof type, `${name} must be a ${type.name}`, TypeError);
    } else {
        throw new TypeError('type must either be a string or a class');
    }
}

module.exports = { assert, assertType };