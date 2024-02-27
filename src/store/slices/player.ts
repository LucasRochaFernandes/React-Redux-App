import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: {
      modules: [
        {
          id: '1',
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
          id: '2',
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
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course.modules[state.currentModuleIndex].lessons[nextLessonIndex]
      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course.modules[nextModuleIndex]
        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    },
  },
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentModule = state.player.course.modules[currentModuleIndex]
    const currentLesson = currentModule.lessons[currentLessonIndex]
    return { currentLesson, currentModule }
  })
}
