import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

Template.User_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.context = Profiles.getSchema().namedContext('User_Profile_Page');
});

Template.User_Profile_Page.helpers({
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  tastes() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile;
  },
});
