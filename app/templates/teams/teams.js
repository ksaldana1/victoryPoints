TeamList = new Mongo.Collection('teams');

if (Meteor.isClient) {
  // return session specific users
  Template.teams.helpers({
    team: function() {
      var currentUserId = Meteor.userId();
      return TeamList.find({createdBy: currentUserId}).fetch();
    },
    // use Session data to add "selected" class
    // for highlighting
    selectedClass: function() {
      var teamid = this._id;
      var selectedTeam = Session.get('selectedTeam')
      if (teamid == selectedTeam) {
        return 'selected'
      }
    }
  })
  Template.teams.events({
    // Set clicked event to selectedTeam
    'click .team': function() {
      var teamid = this._id;
      Session.set('selectedTeam', teamid);
    },
    // Form Event handler
    'submit .addTeam': function(event) {
      event.preventDefault();
      // information to add to collection
      var currentUserId = Meteor.userId();
      var owner = event.target.ownerName.value;
      var teamName = event.target.teamName.value;
      // add to MongoDB collection
      TeamList.insert({
        'owner': owner,
        'teamName': teamName,
        'createdBy': currentUserId,
        'Victory': 0,
        'Wins': 0
      });
      // clear form values after submission
      event.target.ownerName.value = "";
      event.target.teamName.value = "";
    },
    // remove team functionality
    'click .remove': function() {
      // pull current selected from session
      var selectedTeam = Session.get('selectedTeam')
      // confirm prompt for team removal
      if (confirm("Remove Selected Team?")) {
        TeamList.remove(selectedTeam);
      }
    }
  })
}

