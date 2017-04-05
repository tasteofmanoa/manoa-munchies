import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.route('/user-login', {
  name: 'User_Login_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Login_Page' });
  },
});

FlowRouter.route('/admin-login', {
  name: 'Admin_Login_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Login_Page' });
  },
});

FlowRouter.route('/top-picks', {
  name: 'Top_Picks_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Top_Picks_Page' });
  },
});

FlowRouter.route('/your-feed', {
  name: 'User_Feed_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Feed_Page' });
  },
});

FlowRouter.route('/user-settings', {
  name: 'User_Settings_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Settings_Page' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
