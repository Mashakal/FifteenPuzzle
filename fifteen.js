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
        emptySlot,                  // The empty slot on the board.
        puzzleArea;                 // The div element that will hold the game board.
    
    // Always leave one empty slot for maneuvering tiles.
    tileCount = colSlots * rowSlots - 1;
    
    
    /* PUBLIC VARIABLES */
    board.allTiles = [];            // Holds all tile objects.
    board.allSlots = [];            // Holds all the slots on the game board.
    
    
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
    
    
    // THIS FUNCTION IS PROBABLY NOT NECESSARY.
    // Returns the slot that holds the passed in tile object or undefined if the tile is not found.
    function getSlotGivenTile(pTile) {
        var i;      // Loop variable.
        
        // Search the slots array until we find the slot holding the tile object.
        for (i = 0; i < board.allSlots; i += 1) {
            if (board.allSlots[i].tile === pTile) {
                return board.allSlots[i];
            }
        }
        return undefined;
    }
    
    
    // Returns the slot located at position pRow, pColumn.
    function getSlotGivenIndices(pRow, pColumn) {
        return board.allSlots[pRow * colSlots + pColumn];
    }
    
    // Returns an array of tile elements that are legally allowed to be moved, based on a tile element that was clicked on.
    function getMovableInfo(pTile) {
        var info = {},      // The object to be returned.
            slots = [],     // All the slots that hold movable tiles.
            direction = {}, // Which direction to move the tiles, if they are movable.
            numSlots,       // How many slots are between the one clicked and the empty slot.
            delta,          // Either 1 or -1, depending on the empty slot being farther up/down or left/right of pTile.
            i;              // Loop variable.
        
        // Initialize the direction object.
        direction.x = 0;
        direction.y = 0;
        
        // Be certain the tile clicked on is itself moveable.
        // Check if pTile and emptySlot are in the same row.
        if (pTile.currentRow === emptySlot.row) {
            // Add the slot that holds pTile the array of moveable tile's slots.
            slots.push(board.allSlots[pTile.currentSlot]);
            // How many slots hold tiles between pTile and emptySlot, including pTile.
            numSlots = Math.abs((emptySlot.column - pTile.currentColumn));
            // Determine delta based on emptySlot being farther left or right.
            delta = emptySlot.column - pTile.currentColumn > 0 ? 1 : -1;
            // Add additional movable tile's slots that are also in this row.
            for (i = 1; i < numSlots; i += 1) {
                slots.push(getSlotGivenIndices(pTile.currentRow, pTile.currentColumn + delta * i));
            }
            // Set the direction value for movement between rows.
            direction.x = delta;
        // Check if pTile and emptySlot are in the same column.
        } else if (pTile.currentColumn === emptySlot.column) {
            // Add the slot that holds pTile to the array of moveable slots.
            slots.push(board.allSlots[pTile.currentSlot]);
            // How many slots hold tiles between pTile and emptySlot, including pTile.
            numSlots = Math.abs((emptySlot.row - pTile.currentRow));
            // Determine delta based on emptySlot being farther up or down.
            delta = emptySlot.row - pTile.currentRow > 0 ? 1 : -1;
            console.log("Delta is: " + delta);
            // Add additional moveable tile's slots that are also in this column.
            for (i = 1; i < numSlots; i += 1) {
                console.log(pTile.currentRow + delta * i);
                slots.push(getSlotGivenIndices(pTile.currentRow + delta * i, pTile.currentColumn));
            }
            // Set the direction for movement between columns.
            direction.y = delta;
        } else {
            // This tile is not moveable, return undefined.
            return undefined;
        }
        
        info.slots = slots;
        info.direction = direction;
        return info;
    }

    
    // Moves the tiles.
    function moveTiles(pMovableInfo) {
        
    }
    
    // Called when a tile element is clicked on.
    function onTileClick() {
        var clickedTile,        // The object that holds the tile element that was clicked on.
            movableInfo;        // An object that holds an array of movable tile's slots and a direction object.
        
        // Find the tile object related to the tile element that was clicked on.
        clickedTile = getThisTile(this);
        // Get movable information.
        movableInfo = getMovableInfo(clickedTile);
        console.log(movableInfo);
        // If there are moveable tiles, move them.
        // moveTiles(); // this function should update which slots the tiles are in now, may require a helper function.        
    }
    
    
    // Update the pixel location of the slot passed in.
    function updateSlotPosition(pSlot) {
        pSlot.element.style.top = (pSlot.y).toString() + "px";
        pSlot.element.style.left = (pSlot.x).toString() + "px";
    }
    
    // Create slots for the board.
    function createSlot(rowIndex, colIndex) {
        var slot = {},
            i;
        
        slot.element = document.createElement("div");
        slot.element.setAttribute("class", "slot");
        // Index is always equal to the position within allSlots array.
        slot.index = board.allSlots.length;
        // Remember the row and column index for this slot.
        slot.row = rowIndex;
        slot.column = colIndex;
        // Set the position of this slot based on its column and row indices.
        slot.x = (colIndex % colSlots) * tileLength;
        slot.y = (rowIndex % rowSlots) * tileLength;
        // Update the position of this slot within the parent.
        updateSlotPosition(slot);
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
        // Set the current row and column index for this tile.
        tile.currentRow = rowIndex;
        tile.currentColumn = colIndex;
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
        // The last slot is always the empty slot to start.
        emptySlot = board.allSlots[tileCount];
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