import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
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
    play: (state, action) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },
  },
})

export const player = playerSlice.reducer
export const { play } = playerSlice.actions
