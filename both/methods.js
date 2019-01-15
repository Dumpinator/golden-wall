import { Posts, NewPostValidation, UpdatedPostValidation } from '../both'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({

  // INSERT
  insertPost( newPost ){
    NewPostValidation.validate( newPost )
    Posts.insert({
      name: newPost.name,
      title: newPost.title,
      text: newPost.text,
      createAt: new Date(),
      ownerId: this.userId
    })
  },

  // UPDATE
  updatePost( postUpdated ){
    UpdatedPostValidation.validate( postUpdated )

    const ownerIdPost = Posts.findOne({ _id: postUpdated.id }).ownerId

    if ( ownerIdPost === this.userId ){
      //console.log("Tout est OK ! On modifie ;)")
      Posts.update(
        { _id: postUpdated.id },
        { $set:
          {
            title: postUpdated.title,
            text: postUpdated.text
          }
        })
      } else {
      //console.log("Tu n'ai pas le propriaitaire du post ;D")
    }
  },

  // REMOVE
  removePost( idPost ){
    check( idPost, String )

    const ownerIdPost = Posts.findOne({ _id: idPost }).ownerId

    if ( ownerIdPost === this.userId ){
      //console.log("Tout est OK ! On supprime ;)")
      Posts.remove({ _id: idPost })
    } else {
      //console.log("Tu n'ai pas le propriaitaire du post ;D")
    }
  }
})

export { insertPost, updatePost, removePost }
