// Whether X's or O's turn
const turn = document.querySelector(".playerturn");

// X O slots
const slots = document.querySelector(".slots");
const slot = slots.querySelectorAll(".slot");

// players score
const score1 = document.querySelector(".player1-score");
const score2 = document.querySelector(".player2-score");
let firstPlayerScore = 0;
let secondPlayerScore = 0;

// Reset or Restart
const restart = document.querySelector(".restart");
const reset = document.querySelector(".reset");

// counters to count busy slots, full to determine whether slot is full
let counter = 0;
let full = false;

// check win cases with row direction
function checkRow() {
    for (let i = 0; i < 3; i++) {
        let nulls = 0, iks = 0;
        for (let j = 0; j < 3; j++) {
            iks += slot[3 * i + j].innerHTML == '<i class="fa-solid fa-x"></i>';
            nulls += slot[3 * i + j].innerHTML == '<i class="fa-solid fa-o"></i>';
        }
        if (iks == 3) return 1;
        else if (nulls == 3) return -1;
    }
    return 0;
}

// check win cases with column direction
function checkCol() {
    for (let i = 0; i < 3; i++) {
        let nulls = 0, iks = 0;
        for (let j = 0; j < 3; j++) {
            iks += slot[i + 3 * j].innerHTML == '<i class="fa-solid fa-x"></i>';
            nulls += slot[i + 3 * j].innerHTML == '<i class="fa-solid fa-o"></i>';
        }
        if (iks == 3) return 1;
        else if (nulls == 3) return -1;
    }
    return 0;
}

// check win cases with diagonal direction 
function checkDiag() {
    let nulls1 = 0, nulls2 = 0;
    let iks1 = 0, iks2 = 0;
    
    for (let i = 0; i < 3; i++) {
        // First type diagonal
        nulls1 += slot[4 * i].innerHTML == '<i class="fa-solid fa-o"></i>';
        iks1 += slot[4 * i].innerHTML == '<i class="fa-solid fa-x"></i>';

        // Second type diagonal
        nulls2 += slot[2 * (i + 1)].innerHTML == '<i class="fa-solid fa-o"></i>';
        iks2 += slot[2 * (i + 1)].innerHTML == '<i class="fa-solid fa-x"></i>';
    }

    if (nulls1 == 3 || nulls2 == 3) {
        return -1;
    } else if (iks1 == 3 || iks2 == 3) {
        return 1;
    } else {
        return 0;
    }
}

// Assign the winner of the game 
function announceWinner(result) {
    if (result == 1) {
        turn.style.color = "rgb(23,215,23)";
        turn.textContent = "Game over! Player2 has won the game";
        secondPlayerScore++;
    } else {
        turn.style.color = "rgb(23,215,23)";
        turn.textContent = "Game over! Player1 has won the game";            
        firstPlayerScore++;
    }
    score1.textContent = firstPlayerScore;
    score2.textContent = secondPlayerScore;
    return result == 1 || result == -1;
}

// check whether X or O has won
function check() {
    if (checkRow()) {
        let ans = checkRow();
        return announceWinner(ans);
    } else if (checkCol()) {
        let ans = checkCol();
        return announceWinner(ans);
    } else if (checkDiag()) {
        let ans = checkDiag();
        return announceWinner(ans);
    }

}

var ok;
// action for adding X or O icons when appropriate cell has been pushed 
for (const item of slot) {
    ok = false;
    item.addEventListener("click", function() {
        if (!ok) {
            let content;
            if (counter < 9) {
                if (counter & 1) {
                    content = '<i class="fa-solid fa-x"></i>'; 
                    turn.textContent = "It's Player1's turn!";
                }
                else {
                    content = '<i class="fa-solid fa-o"></i>';                
                    turn.textContent = "It's Player2's turn!";
                }
                item.innerHTML = content;
                counter++;
            } 
            if (counter == 9) {
                full = true;
                ok = true;
                turn.textContent = "Draw!";
                turn.style.color = "rgb(144,0,255)";                
            }
            if (check()) ok = true;
        }
    });
}

restart.addEventListener("click", function() {
    for (const item of slot) {
        item.innerHTML = "";
    }
    counter = 0;
    turn.style.color = "white";
    turn.textContent = "It's Player1's turn!";
    ok = false;
});

reset.addEventListener("click", function() {
    for (const item of slot) {
        item.innerHTML = "";
    }
    counter = 0;
    turn.style.color = "white";
    turn.textContent = "It's Player1's turn!";
    score1.textContent = firstPlayerScore = 0;    
    score2.textContent = secondPlayerScore = 0;
    ok = false;
});


/*
0 1 2 
3 4 5
6 7 8
*/