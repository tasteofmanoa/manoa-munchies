import { Template } from 'meteor/templating';

Template.Directory_Munchie.onRendered(function onRendered() {
  this.$('.special.card .image').dimmer({
    on: 'hover'
  });
});