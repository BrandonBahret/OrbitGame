function Game(){
  const PLAYER_COLOR = "#48A19E";

  var gameRadius;
  var gapWidth;
  var playerRadius;
  var pathSpeeds = [0.05,-0.05,0.05,-0.05,0.05,-0.05];

  var score = 0;
  var player = {
    radians: HALF_PI,
    orbit_index: -0.5,
    color: PLAYER_COLOR,
    isAlive: true,
    x: 0,
    y: 0
  };

  var target = newTarget();

  function newTarget(){
    return {
      radians: random(0, TAU),
      orbit_index: -(random([-2,-3,-4,-5]) / 2),
      color: "#79EF36",
      x: 0,
      y: 0
    };
  }

  var enemies = [];
  for(var i = 0; i < 4; i++){
    enemies.push({
      radians: random(0, TAU),
      orbit_index: -1 - (0.5 * i),
      color: "#EF3636",
      x: 0,
      y: 0
    });
  };

  this.reset = function(){
    player = {
      radians: HALF_PI,
      orbit_index: -0.5,
      color: PLAYER_COLOR,
      isAlive: true,
      x: 0,
      y: 0
    };
    score = 0;
    document.getElementById("score").textContent  = "Score: " + score;
  }

  this.update = function(){
    gameRadius = width * 0.78;
    gapWidth = gameRadius / 5;
    playerRadius = gapWidth * 0.45;

    moveEntities();
    checkCollisions();
  }

  function checkCollisions(){
    enemies.forEach(function(enemy){
      var d = dist(enemy.x, enemy.y, player.x, player.y);
      if(d < playerRadius){
        player.isAlive = false;
      }
    });

    var d = dist(target.x, target.y, player.x, player.y);
    if(d<playerRadius){
      target = newTarget();
      document.getElementById("score").textContent  = "Score: " + ++score;
    }
  }

  function moveEntities(){
    var index = abs(player.orbit_index * 2);
    player.radians = (player.radians + pathSpeeds[index]) % TAU;

    enemies.forEach(function(enemy, i){
      index = abs(enemy.orbit_index * 2);
      var offset = i%2==0?0.01:-0.01;
      enemy.radians = (enemy.radians + offset + pathSpeeds[index]) % TAU;
    });

    index = abs(target.orbit_index * 2);
    var offset = i%2==0?0.01:-0.01;
    target.radians = (target.radians - offset + pathSpeeds[index]) % TAU;
  }

  this.jumpIn = function(){
    if(player.orbit_index==-0.5)return;
    player.orbit_index = player.orbit_index + 0.5;
    player.orbit_index = min(player.orbit_index, -1.0);
  }

  this.jumpOut = function(){
    if(player.orbit_index==-2.5)return;
    player.orbit_index = player.orbit_index - 0.5;
    player.orbit_index = max(player.orbit_index, -2.5);
  }

  this.show = function(){
    showOrbitPaths();
    if(player.isAlive) drawPlayer();
    drawEnemies();
    drawEntity(target);

    if(!player.isAlive){
      textSize(60);
      fill("rgba(67, 87, 97, .87)");
      rect(0, height/3, width, height/4);

      fill("#B0BEC5");
      text("Game Over", width/5, height/2);

    }
  }

  function showOrbitPaths(){
    noFill();
    stroke("#90A4AE");
    strokeWeight(7);
    smooth();

    var radius = gameRadius;

    for(var i = 0; i < 5; i++){
      if(i == 4){
        var strokeColor = player.orbit_index == -0.5 ? "#B0BEC5" : color('rgba(176, 190, 197,0.2)');
        stroke(strokeColor);
        strokeWeight(11);
      }
      ellipse(width/2, height/2, radius);
      radius -= gapWidth;
    }
  }

  function drawEntity(entity){
    var oX = width / 2;
    var oY = height / 2;
    var mX = (gapWidth * entity.orbit_index) * cos(entity.radians) + oX;
    var mY = (gapWidth * entity.orbit_index) * sin(entity.radians) + oY;
    noStroke();
    fill(entity.color);
    ellipse(mX, mY, playerRadius);
    entity.x = mX;
    entity.y = mY;
  }

  function drawPlayer(){
    drawEntity(player);
  }

  function drawEnemies(){
    enemies.forEach(function(enemy){
      drawEntity(enemy);
    });
  }

}
