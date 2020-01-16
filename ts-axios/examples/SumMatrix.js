var sumMatrix = function (matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i_1 = 0; i_1 < currentRow.length; i_1++) {
            sum += currentRow[i_1];
        }
    }
    return sum;
};
var sum = sumMatrix([[1, 2, 3], [4, 5, 6]]);
console.log(sum);
