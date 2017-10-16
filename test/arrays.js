const arrays = require('../lib/arrays');

console.log(arrays.range(1, 20));
console.log(arrays.range(9, 87, 7));

let flat = arrays.flatten([1, 2, [3, 4, 5], 6, [7, 8, [9, 10], 11, [[12], 13, 14], 15], 16]);
console.log(flat);

let sliced = arrays.sliceEvery(flat, 3, 2);

let grid = [
    [0, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 1, 0]
];
console.log(grid);

let flatGrid = arrays.flatten(grid);
console.log(flatGrid);

let unflatGrid = arrays.sliceEvery(flatGrid, 4);
console.log(unflatGrid);

console.log(`Remade correctly? ${arrays.equals(grid, unflatGrid)}`);