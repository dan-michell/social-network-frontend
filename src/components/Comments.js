import { useState, useEffect } from 'react'
import Comment from './Comment'
import Networking from '../networking.js'
import { useNavigate } from 'react-router-dom'

function Comments(props) {
  const [openComments, setOpenComments] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [redirect, setRedirect] = useState(undefined)
  const networking = new Networking()
  const navigate = useNavigate()

  useEffect(() => {
    if (redirect) navigate('/login')
  }, [redirect])

  useEffect(() => {
    async function getComments() {
      updateComments()
    }
    getComments()
  }, [])

  async function updateComments() {
    setComments(await networking.fetchComments(props.id))
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (comment.length > 0) {
      const redirect = await networking.postComment(props.id, comment)
      setRedirect(redirect)
      setComment('')
      updateComments()
    }
  }

  function getCommentComponentList() {
    return comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />
    })
  }

  return (
    <div className="flex flex-col items-center text-gray-300 w-full">
      <button
        type="button"
        className="flex items-center font-sm self-start"
        onClick={() => {
          setOpenComments(!openComments)
        }}
      >
        <span className="hover:underline">Comments</span>
        <svg
          className={`w-8 h-8 shrink-0 ${openComments ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className={openComments ? 'w-[80%] mt-2' : 'hidden'}>
        <form>
          {getCommentComponentList()}
          <div className="w-full flex items-center justify-center gap-5 mt-5">
            <input
              type="text"
              placeholder="Comment"
              value={comment}
              className="bg-gray-700 text-gray-200 rounded-lg w-[60%] px-2"
              onChange={(e) => {
                setComment(e.target.value)
              }}
            ></input>
            <button
              className="bg-gray-700 text-gray-200 font-medium rounded-lg text-sm w-20 px-5 py-0.5 text-center"
              onClick={handleCommentSubmit}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Comments
