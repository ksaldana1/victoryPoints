if (Meteor.isClient) {
  Template.standings.helpers({
    // return session specific team list
    team: function() {
      var currentUserId = Meteor.userId();
      return TeamList.find({createdBy: currentUserId}, {'owner': 1, 'teamName': 1, 'Victory': 1}).fetch();
    }
  })
  Template.standings.helpers({
    // Table Settings
    settings: function () {
        return {
            collection: TeamList,
            rowsPerPage: 10,
            showFilter: true,
            // columns to display on graph
            fields: [{key: 'owner', label: 'Owner'},
                    {key: 'teamName', label: 'Team Name'},
                    {key: 'Victory', label: 'Victory Points'},
                    {key: 'Wins', label: 'Wins'}]
        };
    }
});
}


