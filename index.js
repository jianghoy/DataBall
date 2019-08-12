var express = require("express");
var path = require("path");
var nba = require("nba");

var server = express();
// uncomment this line before going production
//server.use(express.static('client/build'))

server.get("/", function(req, res) {
    console.log('request for home');
  res.sendFile(path.join("index.html"));
});

server.get("/get-player-ids", function(req, res) {
  var playerName = req.query.name;
  res.send(
    nba.searchPlayers(playerName).map(player => ({
      fullName: player.fullName,
      playerId: player.playerId
    }))
  );
});

server.get("/get-player-info", function(req, res) {
  let d = new Date();
  console.log(d.toLocaleTimeString() + " " + d.toLocaleDateString());
  console.log("request: get player");
  console.log("playerName" + req.query.name);
  // hard coded stephen curry
  var playerID = !req.query.id ? 201939 : req.player.id;

  nba.stats
    .playerInfo({ PlayerID: playerID })
    .then(info => {
      const playerInfo = Object.assign(
        info.commonPlayerInfo[0],
        info.playerHeadlineStats[0]
      );
      res.send(playerInfo);
      console.log("success");
    })
    .catch(e => {
      console.log(e);
      res.status(500).send(`error: result unknown; stacktrace is - {e}`);
      console.log("fail");
    });
});

server.get("/get-shots-info", function(req, res) {
  let d = new Date();
  console.log(d.toLocaleTimeString() + " " + d.toLocaleDateString());
  console.log("request: get shots");

  var playerID = req.query.id;
  console.log(playerID);
  nba.stats.shots({ PlayerID: playerID }).then(response => {
    res.send(response);
  });
});

server.listen(3001, function() {
  console.log("server runs on port 3001!");
});
