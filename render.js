import Game from "./engine/game.js";

var game = new Game(4);



export const renderBoard = function (array) {
    return `<div id="board">
        <div class="grid">
        <div class="indexx" id="a0">${helper(array[0])}</div>
        <div class="indexx" id="a1">${helper(array[1])}</div>
        <div class="indexx" id="a2">${helper(array[2])}</div>
        <div class="indexx" id="a3">${helper(array[3])}</div>
        <div class="indexx" id="a4">${helper(array[4])}</div>
        <div class="indexx" id="a5">${helper(array[5])}</div>
        <div class="indexx" id="a6">${helper(array[6])}</div>
        <div class="indexx" id="a7">${helper(array[7])}</div>
        <div class="indexx" id="a8">${helper(array[8])}</div>
        <div class="indexx" id="a9">${helper(array[9])}</div>
        <div class="indexx" id="a10">${helper(array[10])}</div>
        <div class="indexx" id="a11">${helper(array[11])}</div>
        <div class="indexx" id="a12">${helper(array[12])}</div>
        <div class="indexx" id="a13">${helper(array[13])}</div>
        <div class="indexx" id="a14">${helper(array[14])}</div>
        <div class="indexx" id="a15">${helper(array[15])}</div>
        </div>
        </div>`;
};

export const helper = function (index) {
    if (index == 0) {
        return "";
    } else {
        return index;
    }
};

export const renderScoreboard = function (score) {
    return `<div id="scoreboard">
    <p>Score: ${score}</p>
    <button class="resetButton">Restart</button>
    </div>`;
}

export const resetBoard = function () {
    game.setupNewGame();
    $('#board').replaceWith(renderBoard(game.getGameState().board));
    $('#scoreboard').replaceWith(renderScoreboard(game.getGameState().score));
    $(".resetButton").on("click", resetBoard);
    $('#winner').replaceWith('<p id="winner" hidden>YOU WON!</p>');
    $('#over').replaceWith('<p id="over" hidden>GAME OVER. TRY AGAIN?</p>');
}

export const loadIntoDom = function (game) {
    const $root = $('#root');
    var array = game.getGameState().board;
    $root.append(renderBoard(array));
    $root.append(renderScoreboard(game.getGameState().score));
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                game.move("left");
                $('#board').replaceWith(renderBoard(game.getGameState().board));
                $('#scoreboard').replaceWith(renderScoreboard(game.getGameState().score));
                $(".resetButton").on("click", resetBoard);
                if (game.getGameState().won == true) {
                    $('#winner').removeAttr('hidden');
                }
                if (game.getGameState().over == true) {
                    $('#over').removeAttr('hidden');
                }
                break;

            case 38: // up
                game.move("up");
                $('#board').replaceWith(renderBoard(game.getGameState().board));
                $('#scoreboard').replaceWith(renderScoreboard(game.getGameState().score));
                $(".resetButton").on("click", resetBoard);
                if (game.getGameState().won == true) {
                    $('#winner').removeAttr('hidden');
                }
                if (game.getGameState().over == true) {
                    $('#over').removeAttr('hidden');
                }
                break;

            case 39: // right
                game.move("right");
                $('#board').replaceWith(renderBoard(game.getGameState().board));
                $('#scoreboard').replaceWith(renderScoreboard(game.getGameState().score));
                $(".resetButton").on("click", resetBoard);
                if (game.getGameState().won == true) {
                    $('#winner').removeAttr('hidden');
                }
                if (game.getGameState().over == true) {
                    $('#over').removeAttr('hidden');
                }
                break;

            case 40: // down
                game.move("down");
                $('#board').replaceWith(renderBoard(game.getGameState().board));
                $('#scoreboard').replaceWith(renderScoreboard(game.getGameState().score));
                $(".resetButton").on("click", resetBoard);
                if (game.getGameState().won == true) {
                    $('#winner').removeAttr('hidden');
                }
                if (game.getGameState().over == true) {
                    $('#over').removeAttr('hidden');
                }
                break;

            default:
                return;
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $(".resetButton").on("click", function () {
        resetBoard();
    });

}

$(function () {
    //var game = new Game(4);
    loadIntoDom(game);
});