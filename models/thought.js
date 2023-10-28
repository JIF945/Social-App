const { Schema, model, Types } = require('mongoose');
// reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now
    },

});
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            Max_length: 280,
        },
        createdAt: {
            type: Date,
            default:Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
        {
toJSON : {
    virtuals: true,
    getters: true,
},
id: false,
    }
);

thoughtSchema.virtual("reactionCount")
.get(function () {
    return this.reactions.length;
});



const thought  = model('thought', thoughtSchema);

module.exports = thought;
