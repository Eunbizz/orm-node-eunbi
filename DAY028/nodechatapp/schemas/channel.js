const mongoose = require('mongoose')

const AutoIncrement = require('mongoose-sequence')(mongoose);
const{Schema} = mongoose;

const channelSchema = new Schema({
    category_code: {
        type:Number,
        required: true
    },
    channel_name: {
        type:String,
        required: true
    },
    user_limit: {
        type:Number,
        required:false
    },
    channel_img_path: {
        type:String,
        required:false
    },
    channel_desc: {
        type:String,
        required:false
    },
    channel_state: {
        type:Number,
        required: true
    },
    reg_date: {
        type:Date,
        default:Date.now
    },
    reg_member_id: {
        type:Number,
        required: true
    },
    edit_member_id: {
        type:Number,
        required: false
    },
    edit_date: {
        type:Date,
        default:Date.now
    }
})

channelSchema.plugin(AutoIncrement,{inc_field:"channel_id"});

module.exports = mongoose.model('Channel', channelSchema);