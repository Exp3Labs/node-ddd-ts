import { Schema, model } from 'mongoose';

// Schema
const schema = new Schema({
  uuid: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  breed: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Model = model('Dog', schema);

export default Model;
