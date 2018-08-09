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
window.findNRooksSolution = function(n) {
  if (n < 1) {
    return false;
  }
  var solution = new Board({'n':n});
  
  
  // var empty = [];
  // empty.length = n;
  // empty.fill(0);
  // for (var i = 0; i < n; i++) {
  //   solution.push(empty);
  // }
  
  var numOfPiecesAdded = 0;
  
  //Input: board
  //Ouput: board
  //Constraints: None
  //Edge Cases: None
  var addRook = function(board) {
    if (numOfPiecesAdded === n) {
      return this;
    }

    //check if has any conflicts (use helper function) 
      //hasRowConflictAt.call(board, rowIndex)
        //check rows && columns
      //if there's a conflict then return falsey (stop our recursion on that tree)

    //Loop through every row of board
      //loop through every column of every row
        //check if that square is occupied 
          //if not occupied -> put a rook there
            //add to our count of rooks
            //call the addRook function recursively and push it's solution to a solution array
    


    for (var i = 0; i < this.get('n'); i++) {
      for (var x = 0; x < this.get('n'); x++) {
        //empty board
        var board = this;
        if (!this.get(i)[x]) {
          
          
          board.get(i)[x] = 1;
           return addRook.call(board);
        }
      }
    }

  };
  
  addRook.call(solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
