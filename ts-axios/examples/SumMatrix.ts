const sumMatrix = (matrix: number[][]) => {
    let sum = 0
    for (let i = 0; i < matrix.length; i++) {
        let currentRow = matrix[i]
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i]
        }
    }
    return sum
}

const sum = sumMatrix([[1, 2, 3], [4, 5, 6]])
console.log(sum)
