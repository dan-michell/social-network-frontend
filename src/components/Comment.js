function Comment(props) {
  const { comment, created_at, email } = props.comment

  return (
    <div className="w-full text-gray-200 flex flex-col mb-2 px-2 py-1 bg-gray-700 rounded-lg">
      <div className="flex flex-col">
        <p>{comment}</p>
        <p className="text-gray-400 italic">
          {email} posted at, {created_at}
        </p>
      </div>
    </div>
  )
}

export default Comment
