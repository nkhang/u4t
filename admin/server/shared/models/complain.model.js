const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ComplainSchema = new Schema(
    {}, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
);

ComplainSchema.plugin(mongoosePaginate);

const ComplainModel = mongoose.model('Complain', ComplainSchema);

module.exports = ComplainModel;
