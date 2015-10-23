if (Meteor.isClient) {
  Template.results.helpers({
    // collection helper function
    team: function() {
      return TeamList;
    }
  })
  Template.dropDown2.helpers({
    // collection helper function - return teams
    teamNames: function() {
      var currentUserId = Meteor.userId();
      return TeamList.find({
        createdBy: currentUserId
      }).fetch().map(function(team) {
        return team.teamName
      });
    },
  });
  Template.dropDown2.events({
    // set selected team based on dropdown selection
    'change .dd2': function(e) {
      var teamName = e.target.options[e.target.selectedIndex].text
      var selTeam = TeamList.findOne({
        teamName: teamName
      })
      Session.set('selTeam', selTeam)
      console.log(Session.get('selTeam'))
    },
  });
  Template.results.events({
    // on submit, update win # and score Array
    'submit form': function(e) {
      // misc information before calculations
      var pointsArray = []
      e.preventDefault();
      var selTeam = Session.get('selTeam')
      var id = selTeam._id;
      var wins = parseInt(document.getElementById('sel1').value)
      // loop for every week of season entered
      for (var i = 1; i < 15; i++) {
        pointsArray[i] = document.getElementById('week' + [i]).value;
      };
      // set wins key
      TeamList.update(id, {
        $set: {
          Wins: wins
        }
      });
      // set pointsArray values
      TeamList.update(id, {
        $set: {
          scores: pointsArray
        }
      });
      // reset forms/dropdown after submission
      document.getElementById('sel1').value = 0
      document.getElementsByClassName('scores')[0].reset()
    }
  })
}

