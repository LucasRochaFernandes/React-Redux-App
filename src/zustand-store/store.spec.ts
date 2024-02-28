import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store } from '.'

const courseExample = {
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
}
const initialStore = store.getState()

describe('Zustand store', () => {
  beforeEach(() => {
    store.setState(initialStore)
  })
  it('should be able to play', () => {
    const { play } = store.getState()
    play([1, 2])
    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })
  it('should be able to play next video automatically', () => {
    store.setState({ course: courseExample })
    const { next } = store.getState()
    next()
    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(0)
  })
})
