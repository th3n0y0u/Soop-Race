function mainclass() {
  var gamemode;
  var timer = 5;
  onEvent("win_menubutton", "click", function( ) {
    setScreen("start");
  });
  onEvent("play_race_mode", "click", function() {
    gamemode = "race";
    startGame(gamemode);
    led.on();
  });
  onEvent("play_run_mode", "click", function( ) {
    gamemode = "run";
    startGame(gamemode);
  });
  onEvent("replay", "click", function() {
    startGame(gamemode);
  });
  
  onBoardEvent(buttonL, "press", function() {
    if (gamemode == "race") {
      movePlayer("Soop1");
      checkWin("Soop1");
    } else {
      movePlayer("run_red");
      checkWin("run_red");
    }
  });
  
  onBoardEvent(buttonR, "press", function() {
    if (gamemode == "race") {
      movePlayer("Soop2");
      checkWin("Soop2");
    } else {
      movePlayer("run_blue");
      checkWin("run_blue");
    }
  });
  
  function startGame(gametype) {
    if (gametype == "race") {
      // Move both players to the top of the screen
      setProperty("Soop1", "y", 0);
      setProperty("Soop2", "y", 0);
      // Switch to the "game" screen
      setScreen("race_game");
    } else {
      // Move both players to the top of the screen
      setProperty("run_red", "y", 0);
      setProperty("run_blue", "y", 0);
      // Switch to the "game" screen
      setScreen("run_game");
    }
  }
  
  function movePlayer(player, gametype) {
    if (gametype == "race") {
      // Get the "y" property of the player
      // and assign it to the variable player_y
      var player_y = getProperty(player, "y");
      var player_x = getProperty(player, "x");
      var randomnumber = randomNumber(1, 350);
      // Increase player_y by 10
      player_y += randomNumber(1, 10);
      if (player_x == 0) {
        player_x += randomNumber(1, 2);
      } else {
        player_x -= randomNumber(1, 2);
      }
      if (player_y == randomnumber) {
        player_y -= randomNumber(1, 50);
      }
      // Set the player's y property to the
      // new player_y value
      setProperty(player, "x", player_x);
      setProperty(player, "y", player_y);
    } else {
      var run_player_y = getProperty(player, "y");  
      if (player == "run_blue") {
        // Get the "y" property of the player
        // and assign it to the variable player_y
        // Increase player_y by 10
        run_player_y += 10;
        // Set the player's y property to the
        // new player_y value
        setProperty(player, "y", run_player_y);
      } else {
        if (timer <= 0) {
          // Get the "y" property of the player
          // and assign it to the variable player_y
          // Increase player_y by 10
          run_player_y += 10;
          // Set the player's y property to the
          // new player_y value
          setProperty(player, "y", run_player_y);
        } else {
          timer -= 1;
        }
      }
    }
  }
  
  function checkWin(player) {
    if (gamemode == "race") {
      // Get the "y" property of the player
      // and assign it to the variable player_y
      var player_y = getProperty(player, "y");
      // Check if player has reached the bottom.
      // If it has, announce the winner.
      if (player_y >= 450) {
        setScreen("win");
        setProperty("winner", "text", player);
        console.log(player);
        if (player == "Soop1") {
          setProperty("winner_image", "image", "Gabion.png");
          buzzer.frequency(1000, 1000);
        } else {
          setProperty("winner_image", "image", "Gabion2.png");
          buzzer.frequency(100, 1000);
        }
        
      }
    } else {
      var onerun_player_y = getProperty("run_blue", "y");
      var tworun_player_y = getProperty("run_red", "y");
      if (onerun_player_y >= 450) {
        setScreen("win");
        setProperty("winner", "text", "Soop2");
        setProperty("winner_image", "image", "Gabion2.png");
        buzzer.frequency(1000, 1000);
      }
      if (onerun_player_y == tworun_player_y) {
        setScreen("win");
        setProperty("winner", "text", "Soop1");
        setProperty("winner_image", "image", "Gabion.png");
        buzzer.frequency(100, 1000);
      }
    }
  }
}

mainclass();
