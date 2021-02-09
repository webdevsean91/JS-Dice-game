//Storing muliple variables in scope
var scores, roundScore, activePlayer, gamePlaying;

init(); // Calling the init function

//anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; //generate random number || floor method keeps number non decimal

    //2. Display the results in the UI
        var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
              
    //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1.Add current score to global score
        scores[activePlayer] += roundScore;

        // 2.Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
        // 3.Check if player won the game
            if (scores[activePlayer] >= 100) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            } else {
                //Next player
                nextPlayer();
            }
    }     
});

//Using nextPlayer() function tofollow the DRY principle here
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Ternary operator
    
    //Cleans the score and display it in the user interface
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Changes active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //rolls a one hides the dice
    document.querySelector('.dice').style.display = 'none';
};

//calling init function when click new game button
//Don't need to use a call function here. We don't need to call the funciton immediately here, 
//we just want to tell this event listener, when someone click the button, call the function
document.querySelector('.btn-new').addEventListener('click', init);

//using init function to follow DRY principle here
function init() {
    scores = [0 ,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //select's the class name dice in the HTML file
    document.querySelector('.dice').style.display = 'none';

    //select's the id names in the HTML file
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //Clean active and winner class, and set first player to be active player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};
