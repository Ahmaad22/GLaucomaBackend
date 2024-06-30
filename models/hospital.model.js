const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    city: String,
    district: String,
    specialty: String,
    name: String,
    address: String,
    phone:String,
    image:String,
    time:String,
});

const hospitalModel = mongoose.model('hospital', hospitalSchema);
module.exports.hospitalModel = hospitalModel;




















// const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema({
//     orderId: String,
//     quantity: String,
//     fare: String,
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'product', 
//     },
//     paymentMethod: String,
//     estimatedTime: Date,
//     address:String,
//     condition:String,
//     price: {
//         type: Number,
//         default: 0,
//     }
// });

// const orderModel = mongoose.model('order', orderSchema);
// module.exports.orderModel = orderModel;





