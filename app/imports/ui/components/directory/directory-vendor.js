import { Template } from 'meteor/templating';

Template.Directory_Vendor.onRendered(function onRendered() {
  this.$('.special.card .image').dimmer({
    on: 'hover',
  });
});
