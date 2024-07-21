
function parseNumber(number: string){
    return parseFloat(number.replace(',', '.'))
}

export default parseNumber