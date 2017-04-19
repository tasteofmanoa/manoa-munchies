import { Template } from 'meteor/templating';

Template.Tastes_Form_Fieldd.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

