const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }else if(process.env.NODE_ENV == 'test'){
        console.log("Testing Mode:",...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }else if(process.env.NODE_ENV == 'test'){
        console.log("Testing Mode:",...params)
    }
}

module.exports = {
    info, error
}