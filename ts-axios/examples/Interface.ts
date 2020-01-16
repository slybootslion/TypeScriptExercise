interface Square {
    color: string,
    area: number
}

interface SquareConfig {
    color?: string,
    width?: number
}

const makeSquare = (config: SquareConfig): Square => {
    let newSquare = {
        color: 'white',
        area: 100
    }
    if (config.color) newSquare.color = config.color
    if (config.width) newSquare.area = Math.pow(config.width, 2)

    return newSquare
}

let square = makeSquare({color: 'black', width: 20})
console.log(square)
