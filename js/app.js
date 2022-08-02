var app = {
  init: function () {

    // TODO
    app.drawBoard();

    // Event listeners - TODO
  },
  param: {
    directionList: ['cellCurrent-right', 'cellCurrent-bottom', 'cellCurrent-left', 'cellCurrent-top'],
    nbRow: 4,
    nbColumn: 6,
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
        column[c].classList.add('r' + (r + 1), 'c' + (c + 1))
        row[r].appendChild(column[c])
      }
    }

    board.querySelector('.c1.r1').classList.add('cellStart')
    board.querySelector(`.r${app.param.nbRow}.c${app.param.nbColumn}`).classList.add('cellEnd')
    board.querySelector('.cellStart').classList.add('cellCurrent')
  },

  moveForward: function () {
    const actualPosition = document.querySelector('.cellCurrent')
    let direction
    for (directionTested of app.param.directionList) {
      if (actualPosition.classList.contains(directionTested)) {
        direction = directionTested
      }
    }

    const rowElement = actualPosition.closest('.cellRow')
    const rowElementList = rowElement.querySelectorAll('.cell')
    switch (direction) {
      case app.param.directionList[1]: //bottom
        console.log(app.param.directionList[1], direction);
        rowElementList.forEach((element, key) => {
          if ((element === actualPosition) && (parseInt(rowElement.id[3]) !== app.param.nbRow)) {
            actualPosition.classList.remove('cellCurrent', app.param.directionList[1])
            document.getElementById('row' + (parseInt(rowElement.id[3]) + 1))
              .querySelectorAll('.cell')[key]
              .classList.add('cellCurrent', app.param.directionList[1])
          }
        })

        break

      case app.param.directionList[2]://left
        console.log(app.param.directionList[2], direction);

        rowElementList.forEach((element, key) => {
          if ((element === actualPosition) && ((key) !== 0)) {
            actualPosition.classList.remove('cellCurrent', app.param.directionList[2])
            rowElementList[key - 1].classList.add('cellCurrent', app.param.directionList[2])
          }
        })
        break

      case app.param.directionList[3]: //top
        console.log(app.param.directionList[3], direction);

        rowElementList.forEach((element, key) => {
          if ((element === actualPosition) && ((parseInt(rowElement.id[3]) - 1) !== 0)) {
            actualPosition.classList.remove('cellCurrent', app.param.directionList[3])
            document.getElementById('row' + (parseInt(rowElement.id[3]) - 1))
              .querySelectorAll('.cell')[key]
              .classList.add('cellCurrent', app.param.directionList[3])
          }
        })
        break

      default: //right
        console.log(app.param.directionList[0], direction);
        rowElementList.forEach((element, key) => {
          if ((element === actualPosition) && ((key + 1) !== app.param.nbColumn)) {
            actualPosition.classList.remove('cellCurrent', app.param.directionList[0])
            rowElementList[key + 1].classList.add('cellCurrent', app.param.directionList[0])
          }
        })
    }

  },

  turnRight: function () {
    const actualPosition = document.querySelector('.cellCurrent')
    app.param.directionList.forEach((direction, key) => {
      if (actualPosition.classList.contains(directionTested)) {
        direction = directionTested
      }
    })
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
