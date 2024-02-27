import { useCurrentLesson } from '../store/slices/player'

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson()
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">
        {currentLesson && <>{currentLesson.title}</>}
      </h1>
      <span className="text-sm text-zinc-400">
        {currentModule && <>Módulo - {currentModule.title}</>}
      </span>
    </div>
  )
}
