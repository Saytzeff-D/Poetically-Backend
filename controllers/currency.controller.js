const CC = require('currency-converter-lt')

const convertCurrency = (req, res)=>{
    const payload = req.body
    let currencyConverter = new CC({
        from: payload.from, 
        to: payload.to, 
        amount: payload.amount, 
        isDecimalComma: true
    })
    currencyConverter.convert().then(resp=>{
        console.log(resp)
        res.status(200).json({message: resp})
    })
}

module.exports = { convertCurrency }