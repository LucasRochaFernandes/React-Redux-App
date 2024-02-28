import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
  id: number
  modules: {
    id: number
    title: string
    lessons: {
      id: string
      title: string
      duration: string
    }[]
  }[]
}

export interface PlayerState {
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
  course: Course | null
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,
    load: async () => {
      set({ isLoading: true })
      const response = await api.get('/playlists/1')
      set({
        course: await response.data,
        isLoading: false,
      })
    },
    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex]?.lessons[nextLessonIndex]
      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]
        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          })
        }
      }
    },
  }
})

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state
    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentLesson, currentModule }
  })
}
