import { Posts } from '../both'

Meteor.publish('posts.all', function(){
  return Posts.find({}, { fields: {'name':1, 'title':1, 'text':1, 'createAt':1, 'ownerId':1} } )
})
