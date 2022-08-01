var app = {
  init: function () {

    // TODO
    app.drawBoard();

    // Event listeners - TODO
  },
  param: {
    nbRow: 4,
    nbColumn:6
  },

  drawBoard: function () {
    const board = document.getElementById('board')
    const row = []
    for (let r = 0; r < app.param.nbRow; r++) {
      row.push(document.createElement('div'))
      row[r].classList.add("cellRow")
      row[r].id = 'row' + (r + 1)
      board.appendChild(row[r])
      const column = []
      for (let c = 0; c < app.param.nbColumn; c++) {
        column.push(document.createElement('div'))
        column[c].classList.add("cell")
        column[c].classList.add('r' + (r+1),'c' + (c+1) )
        row[r].appendChild(column[c])
      }
    }

    document.querySelector('.c1.r1').classList.add('cellStart')
    document.querySelector(`.r${app.param.nbRow}.c${app.param.nbColumn}`).classList.add('cellEnd')

  },

  handleLaunchScriptButton: function () {
    // TODO

    // TODO : get all lines as an array

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);


    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function () {
    // TODO display if the game is won or not
  }
};

document.addEventListener('DOMContentLoaded', app.init);
