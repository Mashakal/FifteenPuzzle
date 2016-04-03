/*global console*/
/*jslint */

// Obtain an object representing the puzzle/game board.
var gameBoard = (function () {
    "use strict";
    
    /* PRIVATE VARIABLES */
    var board = {},                 // The object to return.
        rowSlots = 4,               // How many slots are displayed per row.
        colSlots = 4,               // How many slots are displayed per column.
        tileLength = 100,           // The width/height of a slot/tile in pixels.
        tileCount,                  // How many tiles should be made.
        puzzleArea;                 // The div element that will hold the game board.
    
    // Always leave one empty slot for maneuvering tiles.
    tileCount = colSlots * rowSlots - 1;
    
    
    /* PUBLIC VARIABLES */
    board.allTiles = [];            // Holds all tile objects.
    board.allSlots = [];            // Holds all the slots on the game board.
    board.emptySlot = board.allSlots[tileCount];    // Last slot is always empty to start.
    
    
    /* PRIVATE FUNCTIONS */
    
    // Returns the tile object holding the tile element that was clicked on.
    function getThisTile(pElement) {
        var i;      // Loop variable
        // Search the tile's array for pElement
        for (i = 0; i < board.allTiles.length; i += 1) {
            if (board.allTiles[i].element === pElement) {
                return board.allTiles[i];
            }
        }
        return undefined;
    }
    
    // Returns an array of tile elements that are legally allowed to be moved, based on a tile element that was clicked on.
    function getMoveableTiles(pTile) {
        var i;   //Loop variable
        console.log("Movable tiles for tile " + pTile);
        // Check 3 sides for the following 4 ifs
        if(pTile.row === 0){
            // Don't check any higher, top row
            if(pTile.row + 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else if(ptile.column + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.column - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else{
                // no empty slot found
            }
        } else if(pTile.row === 3){
            // don't check any lower, bottom row
            if(pTile.row - 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(ptile.column + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.column - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else{
                // no empty slot found
            }
        }else if(pTile.column === 0){
            // don't check to the left, first column
            if(pTile.row + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.row - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else if(ptile.column + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else{
                // no empty slot found
            }
        }else if(pTile.column === 3){
            // don't check to the right, last
            if(pTile.row + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.row - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else if(pTile.column - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else{
                // no empty slot found
            }
        }else{ // check all 4 sides of the tile
            if(pTile.row + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.row - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else if(ptile.column + 1 === emptySlot){
                // found empty slot at (row + 1, column)
            }else if(pTile.column - 1 === emptySlot){
                // found empty slot at (row - 1, column)
            }else{
                // no empty slot found
            }
        }
    }
    
    // Moves the tiles.
    function moveTiles(pTiles) {
        
    }
    
    // Called when a tile element is clicked on.
    function onTileClick() {
        console.log("Clicked!");
        // Find the appropriate tile object.
        var clickedTile = getThisTile(this);
        console.log(clickedTile);
        var clickedTileNumber = clickedTile.displayText
        // Determine moveable tiles.
        getMoveableTiles(clickedTileNumber);
        // If there are moveable tiles, move them.
        // moveTiles(); // this function should update which slots the tiles are in now, may require a helper function.        
    }
    
    // Create slots for the board.
    function createSlot(rowIndex, colIndex) {
        var slot = {},
            i;
        
        slot.element = document.createElement("div");
        slot.element.setAttribute("class", "slot");
        // Index is always equal to the position within allSlots array.
        slot.index = board.allSlots.length;
        // Set the position of this slot based on its column and row indices.
        slot.x = (colIndex % colSlots) * tileLength;
        slot.y = (rowIndex % rowSlots) * tileLength;
        // Update the position of this slot within the parent.
        board.updateSlotPosition(slot);
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
    function createTile(rowIndex, colIndex) {
        var tile = {};      // The tile object that will be returned.
        
        tile.element = document.createElement("div");
        tile.element.setAttribute("class", "tile");
        // The correct slot for this tile starts at this tile's count.
        tile.correctSlot = board.allTiles.length;
        // Initially, the tile is in the correct slot.
        tile.currentSlot = board.allTiles.length;
        // Index starts at 0, value starts at 1.
        tile.displayText = (board.allTiles.length + 1).toString();
        // Set the background position for this tile.
        setBackgroundPosition(tile, colIndex, rowIndex);
        // Render the tile's displayText value.
        createTileDisplay(tile);
        // Add the tile on click listener.
        tile.element.onclick = onTileClick;
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
            i,          // Loop variables.
            j;
        
        for (i = 0; i < rowSlots; i += 1) {
            for (j = 0; j < colSlots; j += 1) {
                tile = createTile(i, j);
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
    
    
    // Update the pixel location of the slot passed in.
    board.updateSlotPosition = function (pSlot) {
        pSlot.element.style.top = (pSlot.y).toString() + "px";
        pSlot.element.style.left = (pSlot.x).toString() + "px";
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