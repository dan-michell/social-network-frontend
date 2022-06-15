import { Link } from 'react-router-dom'
import Networking from '../networking.js'
import { useState, useEffect } from 'react'

function Header(props) {
  const [user, setUser] = useState('')
  const networking = new Networking()

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await networking.getUser()
      setUser(userInfo)
    }
    getUserInfo()
  }, [user])

  async function handleLogout() {
    await networking.logoutUser()
    setUser('')
  }

  return (
    <nav className=" border-b-[1px] border-gray-600 px-2 py-2.5 w-[85%] mt-3 mb-5">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <a href="https://google.com">
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            Social Network
          </span>
        </a>
        <div className="flex gap-5">
          {user.length > 0 ? (
            <button
              className="text-gray-200 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm
              w-full sm:w-auto px-4 py-1 text-center dark:bg-gray-600
            dark:hover:bg-gray-500"
              onClick={handleLogout}
            >
              Logged in as {user[0].email}, logout?
            </button>
          ) : (
            <Link to="/login">
              <button
                type="submit"
                className="text-gray-200 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm
              w-full sm:w-auto px-4 py-1 text-center dark:bg-gray-600
            dark:hover:bg-gray-500"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
