const mongoose = require('mongoose');
const { secret } = require('../../secret.json');

const MONGO_URI=`mongodb+srv://huyqbui:${secret}@cluster0.m7fmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets name of DB that our collections are part of
    dbName: 'databasenamehere',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  channelName: String,
  channelMessage: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String
      }
    }
  ]
})

const Model = mongoose.model('model', modelSchema)

const userSchema = new Schema({
  displayName: String,
  email: String,
  photo: String,
  uid: String
})

const User = mongoose.model('user', userSchema);

const channelSchema = new Schema({
  name: String,
  channelMessages: {
    type: Schema.Types.ObjectId,
    ref: 'message'
  },
});

// creates a model that will be part of export
const Channel = mongoose.model('channel', channelSchema);

const messageSchema = new Schema({
  name: String,
  message: String,
  timestamp: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

const Message = mongoose.model('message', messageSchema);

module.exports = {
  User,
  Channel,
  Message,
  Model
};