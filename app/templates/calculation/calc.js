if (Meteor.isClient) {
  // Calculate point distribution tiers (top, middle, bottom)
  pointDistribution = function() {
      user = Meteor.userId()
      size = TeamList.find({
        createdBy: user
      }).count()
      var top = Math.floor(size / 3);
      var middle = Math.round(size / 3);
      var bottom = size - top - middle;
      return [top, middle, bottom];
    },
    // aggregate individual scores; aggregate weeks set to sesion variables
    setScores = function() {
      var teams = TeamList.find({
        createdBy: Meteor.userId()
      }).fetch()
      for (var i = 1; i < 15; i++) {
        var arr = []
        teams.forEach(function(e) {
          if (e.scores[i] != "")
            arr.push(e.scores[i])

        });

        function compareNumbers(a, b) {
          return a - b;
        }
        // sort array from lowest to highest value
        arr = arr.sort(compareNumbers);
        Session.set('wk' + i, arr);
      }
    },
    // add VP based off wins --> called by victory calculation
    winsCalc = function() {
      var teams = TeamList.find({
        createdBy: Meteor.userId()
      }).fetch()
      teams.forEach(function(obj) {
        var wins = obj.Wins;
        var vp = obj.Victory;
        var id = obj._id;
        TeamList.update(id, {
          $set: {
            Victory: vp += (wins * 2)
          }
        })
      })
    },

    victoryCalc = function(week) {
      setScores();
      arr = pointDistribution().reverse();
      var scores = Session.get('wk' + week)
      scores.forEach(function(e, i) {
          if (i < arr[0]) {
            awardVictory(e, 0);

          } else if (i < (arr[0] + arr[1])) {
            awardVictory(e, 1)
          } else {
            awardVictory(e, 2)
          }
        })
        // add win points to victory total
      winsCalc();
      console.log("Week " + week + " victory points distributed")
    },
    // victory calc helper function
    awardVictory = function(score, numPoints) {
      var team = TeamList.find({
        scores: score
      }).fetch();
      var id = team[0]._id;
      var vict = team[0].Victory


      TeamList.update(id, {
        $set: {
          Victory: vict += numPoints
        }
      })
    },
    // clear all victory points
    resetVictory = function() {
      var team = TeamList.find({
        createdBy: Meteor.userId()
      }).fetch()
      team.forEach(function(obj) {
        id = obj._id;
        TeamList.update(id, {
          $set: {
            Victory: 0,
            Wins: 0
          }
        })
      })
      console.log("Victory Points Reset!")
    },
    // iterate through weeks depending on prompt answer,
    // update VPs to reflect total standings
    calculateAll = function() {
      weeks = prompt('How many Weeks to Calculate?')
      weeks = weeks++
        for (var i = 1; i <= weeks; i++) {
          victoryCalc(i);
        }
    },
    combineScores = function() {


    }

  Template.calc.events({
    // click handler -> clear victory points button
    'click .clearVictory': function() {
      if (confirm("Reset Victory Points?"))
        resetVictory();
    },
    // clickhandler --> prompt re: how many weeks to calculate
    'click .calcAll': function() {
      calculateAll();
    }

  })
}
