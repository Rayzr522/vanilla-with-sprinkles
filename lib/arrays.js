const { assert, assertType } = require('./utils');

const _equals = (a, b, depth = 0) => {
    assert(depth < 100, 'array is circular or some massive horrifying amalgamation of nested-ness');

    if (a === b) {
        return true;
    }

    if (!(a instanceof Array) || !(b instanceof Array)) {
        return false;
    }

    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] instanceof Array && b[i] instanceof Array) {
            if (!_equals(a[i], b[i], depth + 1)) {
                return false;
            }
            continue;
        }

        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};

/**
 * Compares two arrays to see if they're equal
 * 
 * @param {any[]} a The first array
 * @param {any[]} b The second array
 */
const equals = (a, b) => _equals(a, b);

/**
 * Generates a new array using the given populator function
 * 
 * @param {number} size The size of the array, must be 0 or greater
 * @param {(i: number) => any} populator The function used to populate the new array
 */
const generate = (size, populator = i => i) => {
    assert(size >= 0, 'size must be no less than 0');
    assertType('populator', populator, 'function');

    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = populator(i);
    }
    return arr;
};

/**
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {*} step 
 */
const range = (start, end, step = 1) => {
    assert(end >= start, 'end must be greater than or equal to start');
    assert(step >= 1, 'step must be no less than 1');

    return generate(Math.floor((end - start) / step + 1), i => start + i * step);
};

const _flatten = (array, depth = 0) => {
    assert(depth < 100, 'array is circular (or really heckin deep)');
    assertType('array', array, Array);

    return array.reduce((out, next) => out.concat(next instanceof Array ? _flatten(next, depth + 1) : next), []);
};

/**
 * Flattens an array, removing any levels of nesting
 * 
 * Note: To prevent infinite recursion, this method errors if it reaches a nesting-depth of 100 or greater
 * 
 * @param {any[]} array The array to flatten
 * @returns {any[]} The flattened array
 */
const flatten = array => _flatten(array);

/**
 * Slices an array into multiple arrays of a specified length
 * 
 * @param {any[]} array The array to slice
 * @param {number} [interval=1] The interval on which to slice the array
 * @param {number} [offset=0] The offset on which to slice the array
 * @returns {any[][]} The sliced array
 */
const sliceEvery = (array, interval = 1, offset = 0) => {
    assertType('array', array, Array);
    assert(interval >= 1, 'interval must be no less than 1');
    assert(offset >= 0, 'offset must be no less than 0');

    const output = [];
    for (let i = offset; i < array.length; i += interval) {
        output.push(array.slice(i, i + interval));
    }
    return output;
};

module.exports = { equals, generate, range, flatten, sliceEvery };