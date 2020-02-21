class Game {
  constructor () {
    this.ROLL_HISTORY = [[]]
  }

  score = function () {
    let total = 0
    let spare = false
    let strike = false

    for (let round_number = 0; round_number < this.ROLL_HISTORY.length; round_number++) {
      let round_score = 0

      for (let roll_number = 0; roll_number < this.ROLL_HISTORY[round_number].length; roll_number++) {
        if (this.ROLL_HISTORY[round_number][roll_number] === 10) {
          strike = true
        }
        else if (!strike) {
          if (spare) {
            round_score += this.ROLL_HISTORY[round_number][roll_number]
            spare = false
          }
          round_score += this.ROLL_HISTORY[round_number][roll_number]
        }
        else if (strike && this.ROLL_HISTORY[round_number].length === 2 && roll_number === 1) {
          round_score = 10 + (this.ROLL_HISTORY[round_number][0] + this.ROLL_HISTORY[round_number][1]) * 2
          strike = false
        }
      }

      if (round_score === 10) {
        spare = true
      }

      total += round_score
    }

    return total
  }

  roll = function (knockedPins) {
    const round_number = this.ROLL_HISTORY.length - 1

    if (this.ROLL_HISTORY[round_number].length === 1 && this.ROLL_HISTORY[round_number][0] === 10) {
      this.ROLL_HISTORY.push([knockedPins])
    } else if (this.ROLL_HISTORY[round_number].length === 2) {
      this.ROLL_HISTORY.push([knockedPins])
    } else {
      this.ROLL_HISTORY[round_number].push(knockedPins)
    }
  }

  display = function () {
    return '|' + this.ROLL_HISTORY.join('|') + '||' + this.score() + '||'
  }
}

export default Game
