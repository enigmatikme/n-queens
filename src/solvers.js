/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


//Input: number (area of the board, length of each side)
//Output: board
//Constraints: None
//EdgeCases: negative numbers 

//************* Add boards found variable/array ? -> 
window.findNRooksSolution = function(n) {
  if (n < 0) {
    return false;
  } 
  
  var board = new Board({'n':n});
  var solution = false;
  var numRooks = 0;
  var lengthOfBoard = board.get('n');
  
    for (var numRow = 0; numRow < lengthOfBoard; numRow++) {
      var row = board.get(numRow); 
      for (var numCol = 0; numCol < lengthOfBoard; numCol++) {
        if (row[numCol] === 0) { 

          board.togglePiece(numRow, numCol); 
          if (!board.hasRowConflictAt(numRow) && !board.hasColConflictAt(numCol)) {
            numRooks++;
            if (numRooks === n) {
              solution = board;
              return solution;
            }
            
          } else {
          board.togglePiece(numRow, numCol); 
          }
        }
      }
    }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.findNRooksHelper = function(n) {
  if (n < 0) {
    return false;
  } else if (n === 1) {
    return {'1':1};
  }
  var emptyBoard = new Board({'n':n});
  var solutions =  new Set();
  var lengthOfBoard = emptyBoard.get('n');

  //Input: board
  //Ouput: board
  //Constraints: None
  //Edge Cases: None
  var addRook = function(numOfRooks, lengthOfBoard, rows, cols) {
    if (numOfRooks === n) {
      solutions.add(JSON.stringify(this));
      return;
    } 

    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var row = this.get(rows[rowIndex]); // 0,0 

      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        if (row[cols[colIndex]] === 0) { 

          this.togglePiece(rows[rowIndex], cols[colIndex]); 
          
          if (!this.hasRowConflictAt(rows[rowIndex]) && !this.hasColConflictAt(cols[colIndex])) {
            
            var newRows = rows.slice(0);
            newRows.splice(rows[rowIndex], 1);

            var newCols = cols.slice(0);
            newCols.splice(cols[colIndex], 1);

            addRook.call(this, numOfRooks + 1, lengthOfBoard, newRows, newCols);
            
          }
          this.togglePiece(rows[rowIndex], cols[colIndex]); 
        }
      }
    }

  };
  
  var origRows = _.range(n);
  var origCols = _.range(n);

  addRook.call(emptyBoard, 0, n, origRows, origCols);
  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var boardsFound = [];
  var solutionCount = findNRooksHelper(n).length; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensHelper = function(n) {
  if (n < 1) {
    return false;
  }

  var emptyBoard = new Board({'n':n});
  var solutions =  new Set();
  var lengthOfBoard = emptyBoard.get('n');

  //Input: board
  //Ouput: board
  //Constraints: None
  //Edge Cases: None
  var addQueen = function(numOfQueens, lengthOfBoard, rows, cols) {
    if (numOfQueens === n) {
      solutions.add(JSON.stringify(this));
      return;
    } 

    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var row = this.get(rows[rowIndex]); // 0,0 

      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        if (row[cols[colIndex]] === 0) { 

          this.togglePiece(rows[rowIndex], cols[colIndex]);
          if (!this.hasAnyQueensConflicts(rows[rowIndex], cols[colIndex])) {

            var newRows = rows.slice(0);
            newRows.splice(rows[rowIndex], 1);

            var newCols = cols.slice(0);
            newCols.splice(cols[colIndex], 1);

            addQueen.call(this, numOfQueens + 1, lengthOfBoard, newRows, newCols);
            
          }
          this.togglePiece(rows[rowIndex], cols[colIndex]); 
        }
      }
    }

  };
  
  var origRows = _.range(n);
  var origCols = _.range(n);

  addQueen.call(emptyBoard, 0, n, origRows, origCols);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = findNQueensHelper(n).length; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensHelper(n).length; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
