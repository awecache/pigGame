/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let score, roundScore,activePlayer, gameOn;
let diceDOM=document.querySelector('.dice');
initiate();

//set winning score
let winScore=100
document.querySelector('.rule').innerHTML='First to reach '+winScore.toString()+' points wins!';

//roll dice
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameOn){

        // random number
        let dice= Math.floor(Math.random()*6)+1;

        // Display the result
        diceDOM.style.display='block';
        diceDOM.src= `dice-${dice}.png`;

        // update the round score if the rolled number was not 1
        if(dice !==1){
            roundScore=roundScore+dice;
            document.querySelector('#current-'+activePlayer).innerHTML=roundScore;
        }else{
            //set current round score=0
            roundScore=0;
            document.querySelector('#current-'+activePlayer).innerHTML=roundScore;

            //next player
                // activePlayer=(activePlayer===0? 1: 0);// activePlayer=1-activePlayer;
                // document.querySelector('.player-0-panel').classList.toggle('active');
                // document.querySelector('.player-1-panel').classList.toggle('active');
            nextPlayer();
            //hide dice at every turn
            //diceDOM.style.display='none';
        }
    }
    

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameOn){
        
        //add the round score to total score of each player
        score[activePlayer]+=roundScore;

        //display to panel
        document.querySelector('#score-'+activePlayer).textContent=score[activePlayer];


        //check if player has won the game //set winning condition
        if(score[activePlayer]>=winScore){
            document.querySelector('#name-'+activePlayer).textContent='Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            gameOn=false;
            
        } else{
            //next player if game hasn't ended
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click',initiate);

function initiate(){
    score=[0,0];
    roundScore=0;
    activePlayer=0;
    diceDOM.style.display='none';

    //DOM reset
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;
    document.querySelector('#name-0').textContent='Player 1!';
    document.querySelector('#name-1').textContent='Player 2!';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.add('active');
    gameOn=true;
    


}

function nextPlayer(){
    activePlayer=(activePlayer===0? 1: 0);// activePlayer=1-activePlayer;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}