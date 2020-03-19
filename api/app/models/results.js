const mongoose = require('mongoose')

const Schema = mongoose.Schema
const STATUS = ['Queued', 'In Progress', 'Success', 'Failure']

const ResultSchema = new Schema({

    Status: { type: String, enum: STATUS, default: 'Queued' },
    RepositoryName: { type: String, default: '' },
    Findings: { type: Object, default: {} },
    QueuedAt: { type: Date, default: Date.now },
    ScanningAt: { type: Date, default: Date.now },
    FinishedAt: { type: Date, default: Date.now }

}, {
    timestamps: true
})

module.exports = mongoose.model('Result', ResultSchema)
