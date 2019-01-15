import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const Posts = new Mongo.Collection('posts')

export const NewPostValidation = new SimpleSchema({
  name: {
    type: String,
    max: 20,
  },
  title: {
    type: String,
    max: 20
  },
  text: {
    type: String,
    max: 300
  }
})

export const UpdatedPostValidation = new SimpleSchema({
  id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    max: 20
  },
  text: {
    type: String,
    max: 300
  }
})
