// services
const { results } = require('@services')

const { sendData, sendError } = require('@utils/responses')

const add = (req, res) => {
    let result = req.body
    result.Findings = JSON.parse(result.Findings)
    results.add(result)
        .then(data => {
            sendData(res, {
                data
            })
        })
        .catch(err => {
            sendError(res, {
                errors: err
            })
        })
}

const get = (req, res) => {
    results.get()
        .then(data => {
            sendData(res, {
                data
            })
        })
        .catch(err => {
            sendError(res, {
                errors: err
            })
        })
}

const edit = (req, res) => {
    let id = req.params.id
    let data = req.body
    data.Findings = JSON.parse(data.Findings)
    results.edit(id, data)
        .then(data => {
            sendData(res, {
                data
            })
        })
        .catch(err => {
            sendError(res, {
                errors: err
            })
        })
}

const deleteRecord = (req, res) => {
    let id = req.params.id
    results.deleteRecord(id)
        .then(data => {
            sendData(res, {
                data
            })
        })
        .catch(err => {
            sendError(res, {
                errors: err
            })
        })
}
module.exports = {
    add,
    get,
    edit,
    deleteRecord
}
