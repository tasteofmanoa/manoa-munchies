import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export AvailableSchema = new SimpleSchema({
  "day": {
    type: Number,
    min: 1,
    max: 7
  },
  "start": {
    type: String,
  },
  "end": {
    type: String,
  }
});