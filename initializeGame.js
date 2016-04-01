/*global console*/
/*jslint */

// Obtain an object representing the puzzle/game board.
var gameBoard = (function () {
    "use strict";
    
    /* PRIVATE VARIABLES */
    var board = {},                 // The object to return.
        rowSlots = 4,               // How many slots are displayed per row.
        colSlots = 4,               // How many slots are displayed per column.
        tileCount,                  // How many tiles should be made.
        puzzleArea;                 // The div element that will hold the game board.
    
    // Always leave one empty slot for maneuvering tiles.
    tileCount = colSlots * rowSlots - 1;
    
    
    /* PUBLIC VARIABLES */
    board.allTiles = [];            // Holds all tile objects.
    
    
    /* PRIVATE FUNCTIONS */
    
    // Creates and returns a tile object.
    function createTile(indexValue) {
        var tile = {};              // The tile object that will be returned.
        
        tile.element = document.createElement("div");
        tile.element.setAttribute("class", "tile");
        // The correct slot for this tile.
        tile.correctSlot = indexValue;
        // Initially, the tile is in the correct slot.
        tile.currentSlot = indexValue;
        // Index starts at 0, value starts at 1.
        tile.displayText = (indexValue + 1).toString();
        
        return tile;
    }
    
    
    /* PUBLIC FUNCTIONS */
    
    // Creates the game board.
    board.init = function (boardId) {
        var tile,   // The tile that has been created.
            i;      // Loop variable.
        
        // Initialize the global puzzleArea.
        puzzleArea = document.getElementById(boardId);
        
        // Create the appropriate number of tiles.
        for (i = 0; i < tileCount; i += 1) {
            tile = createTile(i);
            puzzleArea.appendChild(tile.element);
            board.allTiles.push(tile);
        }
    };
    
    
    return board;
}());
    

// Initialize the game board when the window has finished loading.
(function () {
    "use strict";
    
    window.onload = function () {
        var boardId = "puzzlearea";     // The element ID of the board div.
        
        // Create the game board.
        gameBoard.init(boardId);
    };
    
}());