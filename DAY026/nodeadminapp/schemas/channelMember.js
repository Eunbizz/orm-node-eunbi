const mongoose = require('mongoose')

const AutoIncrement = require('mongoose-sequence')(mongoose);
const{Schema} = mongoose;

const channelMemberSchema = new Schema({
    member_id: {
        type:Number,
        required: true,
        ref:'Member'
    },
    nick_name: {
        type:Number,
        required: true
    },
    member_type_code: {
        type:Number,
        required: true
    },
    active_state_code: {
        type:Number,
        required: true
    },
    last_contact_date: {
        type:Date,
        required:Date.now
    },
    last_out_date: {
        type:Date,
        required:Date.now
    },
    connection_id: {
        type:String,
        required:false
    },
    ip_address: {
        type:String,
        required: false
    },
    edit_member_id: {
        type:Number,
        required: false
    },
    edit_date: {
        type:Date,
        required: Date.now
    }
})

channelMemberSchema.plugin(AutoIncrement,{inc_field:"channel_id"});

module.exports = mongoose.model('ChannelMember', channelMemberSchema);