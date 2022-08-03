var app = {
  init: function () {

    // TODO
    app.drawBoard();
    const error = app.testAll()
    if (error.error) (
      alert(error.message)
    )

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
    board.querySelector('.cellStart').classList.add('cellCurrent', 'cellCurrent-right')
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
    let nextDirection
    app.param.directionList.forEach((directionTested, key) => {

      if (actualPosition.classList.contains(directionTested)) {

        actualPosition.classList.remove(directionTested);

        key++
        if ((key) > (app.param.directionList.length - 1)) {
          actualPosition.classList.add(app.param.directionList[0])
        }
        else
          nextDirection = app.param.directionList[key]
      }
    })
    actualPosition.classList.add(nextDirection)
  },
  turnLeft: function () {
    const actualPosition = document.querySelector('.cellCurrent')
    let nextDirection
    app.param.directionList.forEach((directionTested, key) => {

      if (actualPosition.classList.contains(directionTested)) {

        actualPosition.classList.remove(directionTested);


        if ((key - 1) < 0) {

          nextDirection = app.param.directionList[app.param.directionList.length - 1]
        }
        else
          nextDirection = app.param.directionList[key - 1]
        //console.log('key', key, ' prochaine direction', (nextDirection));
      }
    })
    actualPosition.classList.add(nextDirection)
  },

  testAll: function () {
    goodCollumnCell = ['c2', 'c2', 'c1', 'c1']
    googRowCell = ['r1', 'r2', 'r2', 'r1']
    const usualError = {
      error: false,
      message: []
    }
    try {
      for (key in app.param.directionList) {
        const startingCell = document.querySelector('.cellCurrent')
        app.moveForward();
        const actualCell = document.querySelector('.cellCurrent')
        if (!(actualCell.classList.contains(goodCollumnCell[key]) && actualCell.classList.contains(googRowCell[key]))
          || startingCell.classList.contains('cellCurrent')) {

          usualError.error = true
          usualError.message.push(`moveForward ${app.param.directionList[key].slice(12)} failed`)
        }
        app.turnRight()
        const turnedCellRight = document.querySelector('.cellCurrent')
        if (turnedCellRight.classList.contains(app.param.directionList[key])
          || !turnedCellRight.classList.contains(app.param.directionList[(parseInt(key) + 1) % app.param.directionList.length])) {
          //console.log(turnedCellRight.classList.contains(app.param.directionList[key]))
          //console.log(!turnedCellRight.classList.contains(app.param.directionList[(parseInt(key) + 1) % app.param.directionList.length]));
          usualError.error = true
          usualError.message.push(`turnRight to ${app.param.directionList[key].slice(12)} failed`)
        }
        app.turnLeft()
        const turnedCellLeft = document.querySelector('.cellCurrent')
        //contient la bonne nouvelle classe ()$

        if (turnedCellLeft.classList.contains(app.param.directionList[(parseInt(key) + 1) % app.param.directionList.length])
          || !turnedCellLeft.classList.contains(app.param.directionList[(parseInt(key)) % app.param.directionList.length])) {
          //console.log(turnedCellLeft.classList, ' // ',app.param.directionList[key])
          //console.log(turnedCellLeft.classList, ' // ', app.param.directionList[(parseInt(key) ) % app.param.directionList.length])
          usualError.error = true
          usualError.message.push(`turnLeft to ${app.param.directionList[key].slice(12)} failed`)
        }
        app.turnRight()


      }
    }
    catch (error) {
      console.log(error);
      usualError.message.push(error)
      return usualError
    }
    return usualError





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
