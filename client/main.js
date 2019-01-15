import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Meteor } from 'meteor/meteor'
import { Posts } from '../both'
import { insertPost, updatePost, removePost } from '../both';

import moment from 'moment';

import './main.html';

// template global
Template.registerHelper('fromNow', function(date) {
  return moment(date).fromNow()
})

Template.registerHelper('from', function(date) {
  return moment(date).format('LLL')
})

Template.registerHelper('egal', function(a, b) {
  return a === b
})

Template.form_new_post.events({
  'submit .js-new-post'(event, instance){
    event.preventDefault()


    const nameDiv = document.getElementById('name')
    const titleDiv = document.getElementById('title')
    const textDiv = document.getElementById('text')

    // input value
    const nameValue = event.target.name.value
    const titleValue = event.target.title.value
    const textValue = event.target.text.value

    if ( nameValue === '' ){
      console.log( "Le name est vide :(")
      }

    if ( titleValue === '' ){
        console.log( "Le titre est vide :(")
      }

    if ( textValue === '' ){
      console.log( "Le message est vide :(" )
    } else {

    Meteor.call('insertPost', { name: nameValue, title: titleValue, text: textValue })
    event.target.name.value = ''
    event.target.title.value = ''
    event.target.text.value = ''
    }
  },
});

Template.display_all_posts.onCreated( function(){
  this.subscribe('posts.all')
})

Template.display_all_posts.helpers({
  posts(){
    return Posts.find().fetch().reverse()
  },
})

// MODAL //
Template.single_post.events({
  "click .js-modal-show-post"(event, instance){

    Modal.show('modal_show_post', instance.data)
  },
})

Template.modal_show_post.events({
  "click .js-modal-edit-post"(event, instance){

    Modal.hide('modal_show_post')
    Modal.show('modal_edit_post', instance.data)
  },

  "click .js-delete-post"(event, instance){
    const idPost = instance.data.post._id

    Meteor.call('removePost', idPost)
    Modal.hide('modal_show_post')
  }
})

Template.modal_edit_post.events({
  "submit .js-edit-post"(event, instance){
    event.preventDefault()

    const idPost = instance.data.post._id
    const newTitle = event.target.title.value
    const newText = event.target.text.value

    Meteor.call('updatePost', { id: idPost, title: newTitle, text: newText })
    Modal.hide('modal_edit_post')
  }
})

Template.home_login.events({
  "click .js-logout"(event, instance){
    Meteor.logout()
  },
})
