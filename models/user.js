const { Schema, model } = require('mongoose');

// Schema to create a User model
const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
        },
        email: {
        type: String,
        required: true,
        unique: true,
        match: true,
        },
        thought: [
        {
          type: Schema.Types.ObjectId,
            ref: 'thought',
              },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
             ref: 'user',
             },
        ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
    userSchema.virtual('friendCount')
    .get(function () {
       return this.friends.length; 
    })

      const user = model('user', userSchema);

      module.export = user;