/*global console*/
/*jslint*/

// Obtain an object representing the puzzle/game board.
var gameBoard = (function () {
    "use strict";
    
    /* PRIVATE VARIABLES */
    var board = {},                 // The object to return.
        rowSlots = 4,               // How many slots are displayed per row.
        colSlots = 4,               // How many slots are displayed per column.
        tileLength = 100,           // The width/height of a tile in pixels.
        tileCount,                  // How many tiles should be made.
        slotBorderWidth = 1,        // How many pixels wide the slot border is.
        puzzleArea;                 // The div element that will hold the game board.1
    
    // Always leave one empty slot for maneuvering tiles.
    tileCount = colSlots * rowSlots - 1;
    
    
    /* PUBLIC VARIABLES */
    board.allTiles = [];            // Holds all tile objects.
    board.allSlots = [];            // Holds all the slots on the game board.
    board.emptySlot = board.allSlots[tileCount];    // Last slot is always empty to start.
    
    
    /* PRIVATE FUNCTIONS */
    
    // Create slots for the board.
    function createSlot(indexValue) {
        var slot = {},
            i;
        
        slot.element = document.createElement("div");
        slot.element.setAttribute("class", "slot");
        slot.index = indexValue;
                
        return slot;
    }
    
    // Sets the background image position for the element passed in given the indexes.
    function setBackgroundPosition(pTile, cIndex, rIndex) {
        var backgroundX = ((cIndex % colSlots) * -tileLength).toString() + "px",
            backgroundY = ((rIndex % rowSlots) * -tileLength).toString() + "px";
        pTile.element.style.backgroundPosition = backgroundX + " " + backgroundY;
    }
    
    // Insert a textNode representing the tile number into the tile.
    function createTileDisplay(pTile) {
        // Make the node.
        var node = document.createElement("p");
        node.innerHTML = pTile.displayText;
        // Add the appropriate class.
        node.setAttribute("class", "tileNumber");
        // Append it to the tile.
        pTile.element.appendChild(node);
    }
    
    // Creates and returns a tile object.
    function createTile(colIndex, rowIndex) {
        var tile = {};              // The tile object that will be returned.
        
        // Create the outer div for aesthetic purposes (different border color).
        tile.element = document.createElement("div");
        tile.element.setAttribute("class", "tile");
        // The correct slot for this tile.
        tile.correctSlot = board.allTiles.length;
        // Initially, the tile is in the correct slot.
        tile.currentSlot = board.allTiles.length;
        // Index starts at 0, value starts at 1.
        tile.displayText = (board.allTiles.length + 1).toString();
        // Determine the x position for this tile.
        tile.x = (colIndex % colSlots) * tileLength;
        tile.y = (rowIndex % rowSlots) * tileLength;
        // Update this tile's position on the game board.
        board.updateTilePosition(tile);
        // Set the background position for this tile.
        setBackgroundPosition(tile, colIndex, rowIndex);
        // Render the tile's displayText value.
        createTileDisplay(tile);
        
        return tile;
    }
    
    
    // Manages the creation of the slots.
    function initSlots() {
        var slot,       // The slot object being created.
            i,          // Loop variable.
            j;          // Loop variable.

        // Create the slots
        for (i = 0; i < colSlots; i += 1) {
            for (j = 0; j < rowSlots; j += 1) {
                slot = createSlot(i, j);
                puzzleArea.appendChild(slot.element);
                board.allSlots.push(slot);
            }
        }
    }
    
    
    // Manages the creation of tiles, requires slots to be initialized first.
    function initTiles() {
        var tile,       // The tile object.
            i,
            j;       // Loop variables.
        
        for (i = 0; i < rowSlots; i += 1) {
            for (j = 0; j < colSlots; j += 1) {
                tile = createTile(j, i);
                board.allSlots[board.allTiles.length].tile = tile;
                board.allSlots[board.allTiles.length].element.appendChild(tile.element);
                board.allTiles.push(tile);
                // Check if we have created all the tiles.
                if (board.allTiles.length === tileCount) {
                    return;
                }
            }
        }
    }
    
    
    // Returns an array of tile elements that are legally allowed to be moved, based on a tile element that was clicked on.
    function getMoveableTiles(pTile) {
        // Go 100 pixels in each direction to find empty slot

    }
    
    
    /* PUBLIC FUNCTIONS */
    
    // Creates the game board.
    board.init = function (boardId) {
        // Initialize the global puzzleArea.
        puzzleArea = document.getElementById(boardId);
        // Initialize the slots.
        initSlots();
        // Initialize the tiles.
        initTiles();
    };
    
    
    // Update the pixel location of the tile passed in.
    board.updateTilePosition = function (pTile) {
        pTile.element.style.top = (pTile.y + slotBorderWidth).toString() + "px";
        pTile.element.style.left = (pTile.x + slotBorderWidth).toString() + "px";
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

        // Get movable tiles when mouse is clicked
        document.addEventListener('click', function(e) {
            var target = e.target || e.srcElement;
            if(target.classList.contains("tileNumber")){
                console.log(target);
                // Prints out tile number
                console.log(target.innerHTML);
            }
                // target.style.visibility = 'hidden';
            // if(e.target === "object HTMLParagraphElement"){
            //     console.log("you clicked on " + e.target + ".");
            // }
        });
        
    };

    
}());