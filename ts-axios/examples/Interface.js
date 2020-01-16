var makeSquare = function (config) {
    var newSquare = {
        color: 'white',
        area: 100
    };
    if (config.color)
        newSquare.color = config.color;
    if (config.width)
        newSquare.area = Math.pow(config.width, 2);
    return newSquare;
};
var square = makeSquare({ color: 'black', width: 20 });
console.log(square);
