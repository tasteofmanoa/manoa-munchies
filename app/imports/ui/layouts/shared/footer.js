import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Footer.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
