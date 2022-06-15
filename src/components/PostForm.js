import { useState, useEffect } from "react";
import Networking from "../networking.js";
import { useNavigate } from "react-router-dom";

function SubmitPost(props) {
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(undefined);
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const networking = new Networking();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate("/login");
    // eslint-disable-next-line
  }, [redirect]);

  async function handleStorySubmit(e) {
    e.preventDefault();
    const redirect = await networking.postData(title, url);
    setRedirect(redirect);
    setTitle("");
    setUrl("");
    props.updateStories();
  }

  function handleModalShow() {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button
        className="text-gray-200 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm
          w-full sm:w-auto px-4 py-1 text-center dark:bg-gray-600
          dark:hover:bg-gray-500"
        onClick={handleModalShow}
      >
        Add Post
      </button>

      <div
        className={`${
          showModal ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="fixed left-20 top-28 p-4 w-[40%] h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleModalShow}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a post:</h3>
              <form className="w-full flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  className="bg-gray-600 text-gray-200 rounded-lg w-[90%] px-2 py-1 mb-3"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
                <input
                  type="text"
                  placeholder="URL"
                  value={url}
                  className="bg-gray-600 text-gray-200 rounded-lg w-[90%] px-2 py-1"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                ></input>
                <button
                  className="text-gray-200 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 mt-3 text-center dark:bg-gray-600 dark:hover:bg-gray-500"
                  onClick={handleStorySubmit}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPost;
