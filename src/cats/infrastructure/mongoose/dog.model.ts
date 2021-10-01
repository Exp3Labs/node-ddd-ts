import { Schema, model } from 'mongoose';

// Schema
const catSchema = new Schema({
  uuid: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  }
});

export const CatModel = model('Cat', catSchema);
