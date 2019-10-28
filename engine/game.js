/*
Add your code for Game here
 */
export default class Game {

    constructor(size) {
        this.size = size;
        var length = size * size;
        this.length = length;
        var gameArray = new Array();
        for (var i = 0; i < this.length; i++) {
            gameArray.push(0);
        }
        gameArray[this.selectRandomTile(gameArray)] = this.generateTileValue();
        gameArray[this.selectRandomTile(gameArray)] = this.generateTileValue();
        var gameState = {
            board: gameArray,
            score: 0,
            won: false,
            over: false
        };
        this.gameState = gameState;
        var moveArr = new Array();
        this.moveArr = moveArr;
        var winArr = new Array();
        this.winArr = winArr;
        var overArr = new Array();
        this.overArr = overArr;
    }

    generateTileValue() {
        // returns 2 or 4
        var randomNum = Math.floor((Math.random() * 10) + 1);
        var tileValue;
        if (randomNum > 9) {
            tileValue = 4;
        } else {
            tileValue = 2;
        }
        return tileValue;
    }

    selectRandomTile(array) {
        // returns free index of game array
        var indexOfZed = new Array();
        for (var i = 0; i < array.length; i++) {
            if (array[i] == 0) {
                indexOfZed.push(i);
            }
        }
        var randomIndex = Math.floor(Math.random() * indexOfZed.length);
        return indexOfZed[randomIndex];
    }

    setupNewGame() {
        // reset to new game state
        var gameArray = new Array();
        for (var i = 0; i < this.length; i++) {
            gameArray.push(0);
        }
        gameArray[this.selectRandomTile(gameArray)] = this.generateTileValue();
        gameArray[this.selectRandomTile(gameArray)] = this.generateTileValue();
        var gameState = {
            board: gameArray,
            score: 0,
            won: false,
            over: false
        };
        this.gameState = gameState;
    }

    loadGame(gameState) {
        this.gameState.board = gameState.board;
        this.gameState.score = gameState.score;
        this.gameState.won = gameState.won;
        this.gameState.over = gameState.over;
    }

    toString() {
        var row = 0;
        var outputS = "";
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                outputS += "[" + this.gameState.board[(this.size * i) + j] + "]";
            }
            outputS += "\n";
            //row += 1;
        }
        return outputS;
    }

    onMove(callback) {
        this.moveArr.push(callback);
    }

    onWin(callback) {
        this.winArr.push(callback);
    }

    onLose(callback) {
        this.overArr.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

    combine(array) {
        var compare = new Array();
        for (var i = 0; i < array.length; i++) {
            //clone array
            compare[i] = array[i];
        }
        for (var i = array.length - 1; i >= 0; i--) {
            //move all zeroes to end
            if (array[i] == 0) {
                for (var j = i; j < array.length - 1; j++) {
                    array[j] = array[j + 1];
                }
                array[array.length - 1] = 0;
            }
        }

        for (var i = 0; i < array.length - 1; i++) {
            //combine same numbers
            if (array[i] != 0 && array[i] == array[i + 1]) {
                array[i] += array[i];
                this.gameState.score += array[i];
                for (var j = i + 1; j < array.length - 1; j++) {
                    array[j] = array[j + 1];
                }
                array[array.length - 1] = 0;
            }
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i] != compare[i]) {
                return true;
            }
        }
        return false;
    }

    update() {
        //check for win
        for (var i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] == 2048) {
                this.gameState.won = true;
            }
        }
        if (this.gameState.won) {
            for (var i = 0; i < this.winArr.length; i++) {
                this.winArr[i](this.gameState);
            }
        }
        //check for lose
        //check for full board
        var full = true;
        var noMatch = true;
        for (var i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] == 0) {
                full = false;
            }
        }
        //check adjacent for matches
        if (full) {
            for (var i = 0; i < this.gameState.board.length - 1; i++) {
                if ((i % this.size) == (this.size - 1)) {
                    //end of row; only check under
                    if (this.gameState.board[i] == this.gameState.board[i + this.size]) {
                        noMatch = false;
                    }
                } else if (i >= (this.gameState.board.length - this.size)) {
                    //last row; only check right
                    if (this.gameState.board[i] == this.gameState.board[i + 1]) {
                        noMatch = false;
                    }
                } else {
                    //every other index check right and under
                    if ((this.gameState.board[i] == this.gameState.board[i + this.size]) || (this.gameState.board[i] == this.gameState.board[i + 1])) {
                        noMatch = false;
                    }
                }
            }
        }

        if (noMatch && full) {
            this.gameState.over = true;
            for (var i = 0; i < this.overArr.length; i++) {
                this.overArr[i](this.gameState);
            }
        }
    }

    move(direction) {
        var backToOne = new Array();
        var row = new Array();
        var column = new Array();
        var valid = false;
        if (direction == 'left' || direction == 'right') {
            //make row major 2d array
            var rowTwoDee = new Array();
            for (var k = 0; k < this.size; k++) {
                for (var l = 0; l < this.size; l++) {
                    row[row.length] = this.gameState.board[(k * this.size) + l];
                }
                rowTwoDee.push(row);
                row = new Array();
            }

            if (direction == 'left') {
                for (var i = 0; i < rowTwoDee.length; i++) {
                    if (this.combine(rowTwoDee[i])) {
                        valid = true;
                    }
                }
            } else {
                for (var i = 0; i < rowTwoDee.length; i++) {
                    if (this.combine(rowTwoDee[i].reverse())) {
                        valid = true;
                    }
                    rowTwoDee[i].reverse();
                }
            }

            //convert back to 1d array
            backToOne = new Array();
            for (var i = 0; i < rowTwoDee.length; i++) {
                var roww = rowTwoDee[i];
                for (var j = 0; j < roww.length; j++) {
                    backToOne[(this.size * i) + j] = roww[j];
                }
            }

            //add new tile
            //TODO: check for valid move
            if (valid) {
                var tileVal = this.generateTileValue();
                var tileIndex = this.selectRandomTile(backToOne);
                backToOne[tileIndex] = tileVal;
            }

            //onMove
            this.gameState.board = backToOne;
            for (var i = 0; i < this.moveArr.length; i++) {
                this.moveArr[i](this.gameState);
            }
            this.update();
            return;
        } else if (direction == 'up' || direction == 'down') {
            //make column major 2d array
            var columnTwoDee = new Array();
            for (var i = 0; i < this.size; i++) {
                for (var j = 0; j < this.size; j++) {
                    column[column.length] = this.gameState.board[(this.size * j) + i];
                }
                columnTwoDee.push(column);
                column = new Array();
            }

            if (direction == 'up') {
                for (var i = 0; i < columnTwoDee.length; i++) {
                    if (this.combine(columnTwoDee[i])) {
                        valid = true;
                    }
                }
            } else {
                for (var i = 0; i < columnTwoDee.length; i++) {
                    if (this.combine(columnTwoDee[i].reverse())) {
                        valid = true;
                    }
                    columnTwoDee[i].reverse();
                }
            }
            //convert back to 1d array
            backToOne = new Array();
            for (var i = 0; i < columnTwoDee.length; i++) {
                var coll = columnTwoDee[i];
                for (var j = 0; j < coll.length; j++) {
                    backToOne[(this.size * j) + i] = coll[j];
                }
            }
            //add new tile
            //TODO: check for valid move
            if (valid) {
                var tileVal = this.generateTileValue();
                var tileIndex = this.selectRandomTile(backToOne);
                backToOne[tileIndex] = tileVal;
            }
            this.gameState.board = backToOne;
            for (var i = 0; i < this.moveArr.length; i++) {
                this.moveArr[i]();
            }
            this.update();
            return;
        }


    }
}