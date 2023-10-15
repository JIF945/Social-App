const { Schema, model, Types } = require('mongoose');

const thouoghtSchema = new Schema(
    {
        thoughtText: {
            type: string,
            required: true,
            min_length: 1,
            Max_length: 280,
        },
        createdAt: {
            type: Date,
            default:Date.now,
        },
        username: {
            type: string,
            required: true,
        },
        reactions: [reactions],
    },
        {
toJSON : {
    virtuals: true,
    getters: true,
},
id: false,
    }
);

thouoghtSchema.virtual("reactionCount")
.get(function () {
    return this.reactions.length;
});

// reaction Schema
const reactionSchema = newSchema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required:true,
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

const thought  = model('thought', thouoghtSchema, reactionSchema);

module.export = thought, reactionSchema;
