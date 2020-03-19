const Result = require('@models/results')

const add = (data) => {
    return new Promise(async (resolve, reject) => {
        let tmp = data
        let result = new Result(tmp)
        result.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const get = () => {
    return new Promise((resolve, reject) => {
        Result.find().then(doc => {
            if (doc == null) throw new Error('Result not found')
            resolve(doc)
        }).catch(err => {
            reject(err)
        })
    })
}

const edit = (id, data) => {
    return new Promise((resolve, reject) => {
        Result.find({ _id: id }).update({ $set: data }).then(doc => {
            if (doc == null) throw new Error('Result not found')
            resolve(doc)
        }).catch(err => {
            reject(err)
        })
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        Result.findById(id).then(doc => {
            if (doc == null) throw new Error('Result not found')
            resolve(doc)
        }).catch(err => {
            reject(err)
        })
    })
}

const deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
        Result.find({ _id: id }).remove().then(doc => {
            if (doc == null) throw new Error('Result not found')
            resolve(doc)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    add,
    get,
    edit,
    getById,
    deleteRecord
}
