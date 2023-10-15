const { Schema, model } = require('mongoose');

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
            get: (timestamp) => timesince(timestamp),
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

const thought  = model('thought', thouoghtSchema);

module.export = thought;
