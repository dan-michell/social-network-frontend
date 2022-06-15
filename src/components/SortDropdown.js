function SortDropdown(props) {
  return (
    <div className="w-[60%]">
      <select
        className="mb-5 px-3 py-1 bg-gray-700 rounded-lg text-gray-300"
        value={props.sort}
        onChange={(e) => {
          props.changeSort(e.target.value)
        }}
      >
        <option value="total_votes ASC">Rated: Ascending</option>
        <option value="total_votes DESC">Rated: Descending</option>
        <option value="created_at ASC">Date Posted: Ascending</option>
        <option value="created_at DESC">Date Posted: Descending</option>
      </select>
    </div>
  )
}

export default SortDropdown
