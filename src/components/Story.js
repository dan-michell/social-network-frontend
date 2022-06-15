import Networking from '../networking.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

function Story(props) {
  const [redirect, setRedirect] = useState(undefined)
  const { title, url, id, created_at, total_votes } = props.story
  const networking = new Networking()
  const navigate = useNavigate()

  useEffect(() => {
    if (redirect) navigate('/login')
  }, [redirect])

  async function handleVote(vote) {
    const voteData = { direction: vote }
    const redirect = await networking.postVote(id, voteData)
    setRedirect(redirect)
    props.updateStories()
  }

  return (
    <div className="w-full text-gray-200 flex flex-col mb-8 p-4 bg-gray-600 rounded-lg">
      <div className="flex justify-between">
        <div className="w-[80%] flex">
          <div className="mr-3 mt-3 text-xl min-w-[30px] text-center">
            {total_votes === null ? 0 : total_votes}
          </div>
          <div className="flex flex-col w-full">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {title}
            </a>
            <p className="text-gray-400 italic">Posted at: {created_at}</p>
            <Comments id={id} />
          </div>
        </div>
        <div className="w-26 flex items-start justify-center">
          <button
            className="p-2 hover:text-green-500 mr-2 text-3xl mt-2"
            value="up"
            onClick={(e) => {
              handleVote(e.target.value)
            }}
          >
            ↑
          </button>
          <button
            className="p-2 hover:text-red-500 text-3xl mr-5 mt-2"
            value="down"
            onClick={(e) => {
              handleVote(e.target.value)
            }}
          >
            ↓
          </button>
          <button
            className="hover:text-gray-400 text-xs self-start"
            onClick={async () => {
              const deleteRedirect = await networking.deletePost(id)
              setRedirect(deleteRedirect)
              props.updateStories()
            }}
          >
            ╳
          </button>
        </div>
      </div>
    </div>
  )
}

export default Story
