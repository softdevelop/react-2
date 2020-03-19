const mongoose = require('mongoose')

const Schema = mongoose.Schema
const STATUS = ['Queued', 'In Progress', 'Success', 'Failure']

const ResultSchema = new Schema({

    Status: { type: String, enum: STATUS, default: 'Queued' },
    RepositoryName: { type: String, default: '' },
    Findings: { type: Object, default: {} },
    QueuedAt: { type: Date },
    ScanningAt: { type: Date },
    FinishedAt: { type: Date }

}, {
    timestamps: true
})

module.exports = mongoose.model('Result', ResultSchema)
