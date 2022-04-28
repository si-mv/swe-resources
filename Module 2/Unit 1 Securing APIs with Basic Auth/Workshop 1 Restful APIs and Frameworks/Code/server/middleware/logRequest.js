const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}:${new Date()}`)
    next()
}

module.exports = logRequest