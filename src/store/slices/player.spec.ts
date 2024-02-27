import { describe, it, expect } from 'vitest'
import { play, playerSlice, player, next, PlayerState } from './player'

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Top Songs 1',
        lessons: [
          {
            id: 'YUv2xzvxLT8',
            title: "Travelin' Man",
            duration: '08:00',
          },
          {
            id: 'y5oPZFDci80',
            title: 'Moving in Stereo',
            duration: '08:00',
          },
        ],
      },
      {
        id: 2,
        title: 'Top Songs 2',
        lessons: [
          {
            id: '_MpDmeCrxcw',
            title: 'Setting The Woods On Fire',
            duration: '08:00',
          },
          {
            id: 'KbHaIbDKQMc',
            title: 'Hey Lover',
            duration: '08:00',
          },
        ],
      },
    ],
  },
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe('Player Slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()
    const state = player(initialState, play([1, 2]))
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })
  it('should be able to play next video automatically', () => {
    const state = player(exampleState, next())
    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })
  it('should be able to jump to the next module automatically', () => {
    const state = player(
      {
        ...exampleState,
        currentLessonIndex: 1,
      },
      next(),
    )
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })
})
