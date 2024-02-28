import { ChevronDown } from 'lucide-react'
import { Lesson } from './lesson'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '../zustand-store'

interface ModuleProps {
  title: string
  amountOfLessons: number
  moduleIndex: number
}
// Redux
export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  const currentLessonIndex = useStore((state) => state.currentLessonIndex)
  const currentModuleIndex = useStore((state) => state.currentModuleIndex)
  const play = useStore((state) => state.play)
  // const dispatch = useAppDispatch()
  // const { currentModuleIndex, currentLessonIndex } = useAppSelector((state) => {
  //   return state.player
  // })
  // const lessons = useAppSelector(
  //   (state) => state.player.course?.modules[moduleIndex].lessons,
  // )
  const lessons = useStore(
    (state) => state.course?.modules[moduleIndex].lessons,
  )
  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left ">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto group-data-[state=open]:rotate-180 text-zinc-400 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, index) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === index
              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  onPlay={() => play([moduleIndex, index])}
                  isCurrent={isCurrent}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
