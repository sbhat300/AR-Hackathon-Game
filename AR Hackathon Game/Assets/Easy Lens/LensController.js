// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent arena_text
//@input Component.ScriptComponent arena_map


try {

// Arena setup and gameplay logic for the 2.5D arena

// State
var score = 0;
var totalCoins = 0;
var finished = false;

// Text setup (dynamic only)
function updateScoreText() {
    // Keep score UI safe on screen
    script.arena_text.forceSafeRegion(true);
    script.arena_text.text = "Score: " + score;
}

// Animate obstacle at (3,1) to patrol horizontally to (3,3) and back
function startObstaclePatrol() {
    var obstacles = script.arena_map.findElements('2');
    if (obstacles.length === 0) {
        return;
    }
    var obstacle = obstacles[0]; // Only one obstacle defined in map

    // Capture its starting z to allow patrol 1 <-> 3 at fixed x=3
    var startPos = obstacle.mapPosition;
    var leftZ = 1;
    var rightZ = 3;
    var x = startPos.x;
    var y = startPos.y;

    function moveToZ(targetZ, duration, onDone) {
        script.arena_map.moveToGrid(obstacle, x, targetZ, y, duration, onDone);
    }

    (function loop(toRight) {
        if (finished) {
            return;
        }
        var targetZ = toRight ? rightZ : leftZ;
        moveToZ(targetZ, 1.2, function() {
            loop(!toRight);
        });
    })(true);
}

// Respawn all coins (show them) and reset score/state
function resetRun() {
    finished = false;
    score = 0;

    // Show all coins again
    var coins = script.arena_map.findElements('1');
    totalCoins = coins.length;
    for (var i = 0; i < coins.length; i++) {
        coins[i].show();
    }

    // Update score text
    updateScoreText();

    // Restart obstacle patrol
    startObstaclePatrol();
}

// Begin the game
script.arena_map.startGame();
resetRun();

// Handle collisions with objects
script.arena_map.onObjectEvent.add(function(element, player, phase) {
    if (finished) {
        return;
    }
    if (phase !== 'enter') {
        return;
    }

    if (element.type === '1') {
        // Collect coin
        element.hide();
        score = score + 1;
        updateScoreText();

        // Optional simple win condition: all coins collected
        if (score === totalCoins) {
            // Briefly show final score, then restart
            finished = true;
            var d = script.createEvent("DelayedCallbackEvent");
            d.bind(function() {
                script.arena_map.restartGame();
                resetRun();
            });
            d.reset(0.8);
        }
        return;
    }

    if (element.type === '2') {
        // Hit obstacle: reset
        finished = true;
        var r = script.createEvent("DelayedCallbackEvent");
        r.bind(function() {
            script.arena_map.restartGame();
            resetRun();
        });
        r.reset(0.5);
        return;
    }
});

// Reset if player leaves bounds
script.arena_map.onPlayerOutOfBounds.add(function() {
    if (finished) {
        return;
    }
    finished = true;
    var r = script.createEvent("DelayedCallbackEvent");
    r.bind(function() {
        script.arena_map.restartGame();
        resetRun();
    });
    r.reset(0.5);
});

} catch(e) {
  print("error in controller");
  print(e);
}
