import Player from 'react-player'

import { Loader } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

// Redux
export function Video() {
  // const dispatch = useAppDispatch()
  // const { currentLesson } = useCurrentLesson()
  const { currentLesson } = useCurrentLesson()
  // const isCourseLoading = useAppSelector((state) => state.player.isLoading)
  const isLoading = useStore((store) => store.isLoading)
  const next = useStore((store) => store.next)
  // function handlePlayNext() {
  //   dispatch(next())
  // }
  function handlePlayNext() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      )}
      {currentLesson && (
        <Player
          width="100%"
          height="100%"
          controls={true}
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        />
      )}
    </div>
  )
}
