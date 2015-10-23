// Routing

Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
  name: 'home',
  template: 'home'
})
Router.route('/standings', {
  name: 'standings',
  template: 'standings'
})
Router.route('/teams', {
  name: 'teams',
  template: 'teams'
})
Router.route('/schedule', {
  name: 'schedule',
  template: 'schedule'
})
Router.route('/results', {
  name: 'results',
  template: 'results'
})
Router.route('/calc', {
  name: 'calc',
  template: 'calc'
});
