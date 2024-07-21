function roundDown(number: number, decimals: number) {
    decimals = decimals || 0;
    try{
        return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
    }catch{
        return 0
    }
}

export default roundDown