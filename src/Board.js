// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //Input: number (the row index)
    //Output: boolean  ? (number = index)
    //Constraints: None
    //Edge Cases: anything that's not a number, number larger than the board
    //negative number
    hasRowConflictAt: function(rowIndex) {
      if (typeof rowIndex !== 'number') {
        return false;
      } else if (!this._isInBounds(rowIndex, 0)) {
        return false;
      } 
  
      let count = 0;
      var row = this.get(rowIndex); // [0, 1, 0, 0]
      for (var i = 0; i < row.length; i++) {
        if (row[i]) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      return false; //  fixme
    },

    // test if any rows on this board contain conflicts
    //Input: None
    //Ouput: Boolean
    //Constraints: None
    //Edge Cases: None (empty matrix)
    hasAnyRowConflicts: function() {
      var numRows = this.get('n');
      
      for (var i = 0; i < numRows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      if (typeof colIndex !== 'number') {
        return false;
      } else if (!this._isInBounds(0, colIndex)) {
        return false;
      } 
  
      let count = 0;
      var numRows = this.get('n');
      for (var i = 0; i < numRows; i++) {
        if (this.get(i)[colIndex]) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      return false; //  fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numCols = this.get('n');
      
      for (var i = 0; i < numCols; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //i: index number => starting columnn index in the first row 
    // -> constant: front row :::::: variable: column index
    //o: boolean vakue
    //c: None
    //e: if number is greater or less than the number of rows we have, if its not a number
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var startCol = majorDiagonalColumnIndexAtFirstRow;
      var numCols = this.get('n'); // 4
      var count = 0;
      
      // for (var j = 0; j < numCols; j++) {
      //j = 0 -> row = 0, j= 1 -> row = 1
      for (var col = startCol, row = 0; col < numCols && row < numCols; col++, row++) {
        if (col >= 0 && this.get(row)[col]) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      // }
      //check each row
        //count = 0;
        //check if there is a value at the specific diagonal index
          //if so, increment count
          //check if count > 1
            //return true

      
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numCols = this.get('n');
      
      for (var i = -numCols + 1; i < numCols; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var startCol = minorDiagonalColumnIndexAtFirstRow;
      var numCols = this.get('n'); // 4
      var count = 0;
      
      // for (var j = numCols; j < numCols; j++) {
        //j = 0 -> row = 0, j= 1 -> row = 1
      for (var col = startCol, row = 0; col >= 0 && row < numCols; col--, row++) {
        if (col < numCols && this.get(row)[col]) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      // }
      //check each row
      //count = 0;
      //check if there is a value at the specific diagonal index
        //if so, increment count
        //check if count > 1
          //return true

      
      return false; // fixme
    },   

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var numCols = this.get('n');

      for (var i = 0; i < numCols * 2 - 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
