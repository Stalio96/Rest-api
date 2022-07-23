const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const shoeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    img: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    size: { type: String },
    color: { type: String },
    userId: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Shoe', shoeSchema);
