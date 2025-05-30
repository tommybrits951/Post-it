

function upper(req, res, next) {
    const {firstName, lastName} = req.body;
    let tmpFirst = firstName.trim().split("")
    let tmpLast = lastName.trim().split("")
    tmpFirst[0] = tmpFirst[0].toUpperCase()
    tmpLast[0] = tmpLast[0].toUpperCase()
    let frst = ''
    let lst = ''
    tmpFirst.map(letter => {
        frst += letter
    })
    tmpLast.map(letter => {
        lst += letter
    })
    req.body.firstName = frst
    req.body.lastName = lst
    next()
}
module.exports = upper;