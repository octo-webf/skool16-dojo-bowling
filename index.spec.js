import Game from './index.js'

describe('function score():integer', () => {
  let game

  beforeAll(() => {
    game = new Game()
    game.ROLL_HISTORY = [[1, 3], [4, 4], [5, 1]]
  })

  test('should return the total of all rounds', () => {
    expect(game.score()).toEqual(18)
  })

  describe('when a round done with a spare', () => {
    beforeAll(() => {
      game.ROLL_HISTORY = [[1, 3], [4, 4], [5, 5], [3, 1]]
    })

    test('should return the total 18+15', () => {
      expect(game.score()).toEqual((1 + 3) + (4 + 4) + (5 + 5 + 3) + (3 + 1))
    })
  })

  describe('when a round done with two spares', () => {
    beforeAll(() => {
      game.ROLL_HISTORY = [[3, 7], [4, 4], [5, 5], [3, 1]]
    })

    test('should return the total 18+15', () => {
      expect(game.score()).toEqual((3 + 7 + 4) + (4 + 4) + (5 + 5 + 3) + (3 + 1))
    })
  })

  describe('when a round done with a strike', () => {
    beforeAll(() => {
      game.ROLL_HISTORY = [[1, 2], [3, 4], [5, 3], [10]]
    })

    test('should return a total with 18', () => {
      expect(game.score()).toEqual((1 + 2) + (3 + 4) + (5 + 3))
    })

    describe('when we start a new round after a strike', () => {
      beforeAll(() => {
        game.roll(3)
      })

      test('should return a total with 18', () => {
        expect(game.score()).toEqual((1 + 2) + (3 + 4) + (5 + 3))
      })

      describe('when we done the round after a strike', () => {
        beforeAll(() => {
          game.roll(5)
        })

        test('should return a total with 44', () => {
          expect(game.score()).toEqual((1 + 2) + (3 + 4) + (5 + 3) + 10 + (3 + 5) * 2)
        })

        describe('when after we done make a spare or a strike', () => {
          beforeAll(() => {
            game.roll(8)
          })

          test('should return a total with 52', () => {
            expect(game.score()).toEqual((1 + 2) + (3 + 4) + (5 + 3) + 10 + (3 + 5) * 2 + 8)
          })
        })
      })
    })
  })
})

describe('function roll(integer):void', () => {
  let game

  beforeAll(() => {
    game = new Game()
  })

  describe('when we start a game', () => {
    test('should add a roll to round pins', () => {
      game.roll(2)

      expect(game.ROLL_HISTORY).toEqual([[2]])
    })

    describe('when we roll a second time', () => {
      test('should add a roll to the same round pins', () => {
        game.roll(5)

        expect(game.ROLL_HISTORY).toEqual([[2, 5]])
      })

      describe('when we roll a third time', () => {
        test('should add a roll to another round pins', () => {
          game.roll(7)

          expect(game.ROLL_HISTORY).toEqual([[2, 5], [7]])
        })
      })
    })
  })

  describe('when in the game', () => {
    beforeAll(() => {
      game.ROLL_HISTORY = [[3, 1], [5, 2]]
    })

    test('should make a strike', () => {
      game.roll(10)

      expect(game.ROLL_HISTORY).toEqual([[3, 1], [5, 2], [10]])
    })

    describe('when we roll after a strike', () => {
      test('should add a roll to another round pins', () => {
        game.roll(3)

        expect(game.ROLL_HISTORY).toEqual([[3, 1], [5, 2], [10], [3]])
      })
    })
  })
})

describe('function display():string', () => {
  let game

  beforeAll(() => {
    game = new Game()
    game.ROLL_HISTORY = [[1, 3], [4, 4], [5, 1]]
  })

  test('should display |1,3|4,4|5,1||18||', () => {
    expect(game.display()).toEqual('|1,3|4,4|5,1||18||')
  })
})
