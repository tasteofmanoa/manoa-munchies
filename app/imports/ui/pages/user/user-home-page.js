import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.User_Home_Page.onRendered(function onRendered() {
  this.$('.special.cards .image').dimmer({
    on: 'hover'
  });
});
Template.User_Home_Page.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});