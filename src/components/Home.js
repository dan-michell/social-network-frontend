import React, { useState, useEffect } from "react";
import Networking from "../networking.js";
import Header from "./Header";
import Story from "./Story";
import SortDropdown from "./SortDropdown";
import PostForm from "./PostForm";

function Home(props) {
  const [stories, setStories] = useState([]);
  const [sort, setSort] = useState("total_votes DESC");
  const networking = new Networking();

  useEffect(() => {
    async function getStories() {
      updateStories();
    }
    getStories();
    // eslint-disable-next-line
  }, [sort]);

  async function updateStories() {
    setStories(await networking.fetchData(sort));
    console.log(stories);
  }

  function changeSort(sort) {
    setSort(sort);
  }

  function getStoriesComponentList() {
    return stories.map((story) => <Story key={story.id} story={story} updateStories={updateStories} />);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-start">
      <Header />
      <div className="w-[70%] flex flex-col items-center">
        <div className="flex self-start gap-5">
          <PostForm updateStories={updateStories} />
          <SortDropdown changeSort={changeSort} sort={sort} />
        </div>
        {getStoriesComponentList()}
      </div>
    </div>
  );
}

export default Home;
