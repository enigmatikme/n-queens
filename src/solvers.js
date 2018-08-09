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
  if (n < 1) {
    return false;
  }
  // ********************
  // ********************
  // ********************
  // ********************
  // ********************
  // ********************
  // ********************
  // ********************
  n = 4;
  var emptyBoard = new Board({'n':n});
  var solutions = [];
  // console.log(emptyBoard);
  
  // var empty = [];
  // empty.length = n;
  // empty.fill(0);
  // for (var i = 0; i < n; i++) {
  //   solution.push(empty);
  // }
  
  // var numOfPiecesAdded = 0;
  
  //Input: board
  //Ouput: board
  //Constraints: None
  //Edge Cases: None
  var addRook = function(numOfRooks, lengthOfBoard) {
    if (numOfRooks === n) {
      var potentialSolution = JSON.stringify(this.attributes);
      if (!solutions.includes(potentialSolution)) {
        solutions.push(potentialSolution);
      }
      return;
    } // else if (board === false) {
    //   return false; //exit the loop
    // }
    // console.log(this);
    
              //determine if the return value is not false
                // if so -> push it's solution to a solution array
    for (var numRow = 0; numRow < lengthOfBoard; numRow++) {
      var row = this.get(numRow); // 0,0 

      for (var numCol = 0; numCol < lengthOfBoard; numCol++) {
        if (row[numCol] === 0) { // 0
          //toggle from 0 to 1
          this.togglePiece(numRow, numCol); // 0 -> 1
          // console.log(this.attributes[row][numCol]); // should be 1
          // console.log(this.get(row)[numCol]); // should be 1;
          if (!this.hasAnyRowConflicts(this) && !this.hasAnyColConflicts(this)) {
            //handle this return statement
            addRook.call(this, numOfRooks + 1, lengthOfBoard);
            
          }
          this.togglePiece(numRow, numCol); 

          // ********************
          // ********************
          // ********************
          // ********************
          // ********************
          // ********************// ********************
          // ********************
          // row[numCol] = -1;
        }

      }
    }

  };
  
  //function addRook(numOfRooks, lengthOfBoard)
  addRook.call(emptyBoard, 0, n);
  debugger;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(...solutions));
  console.log(solutions);
  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var boardsFound = [];
  var solutionCount = findNRooksSolution(n).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
