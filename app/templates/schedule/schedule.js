if (Meteor.isClient) {
  Template.dropDown.helpers({
    // return team names for drop-down list
    teamNames: function() {
      var currentUserId = Meteor.userId();
      return TeamList.find({createdBy: currentUserId}).fetch().map(function(team) {
        return team.teamName
      });
    },
  });

  Template.week.helpers({
    // Used to generate correct number of weekly drop-down forms
    matchups: function() {
     var arr = []
     var currentUserId = Meteor.userId();
     for (var i = 0; i < (TeamList.find({createdBy: currentUserId}).count() / 2); i++) {
      arr[i] = i
     }
     return arr;
    },
    // hard coding for #each on template
    numWeeks: function() {
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    }
  })
}


