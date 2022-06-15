import { useState } from "react";
import { Link } from "react-router-dom";
import Networking from "../networking";

function RegisterForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConformation, setPasswordConformation] = useState("");
  const [registerResponse, setRegisterResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const networking = new Networking();

  async function handleUserSubmit(e) {
    e.preventDefault();
    const registerResponseInfo = await networking.registerUser(email, password, passwordConformation);
    setRegisterResponse(registerResponseInfo);
    setShowResponse(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-700 flex flex-col items-center justify-start">
      <div className="self-start ml-5 mt-5">
        <Link to="/">
          <button
            className="text-gray-200 bg-blue-600 hover:bg-blue-800  font-medium rounded-lg text-sm
          w-full sm:w-auto px-4 py-1 text-center dark:bg-gray-600
          dark:hover:bg-gray-500"
          >
            Home
          </button>
        </Link>
        <Link to="/login">
          <button
            type="submit"
            className="text-gray-200 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm
          w-full sm:w-auto px-4 py-1 ml-3 text-center dark:bg-gray-600
          dark:hover:bg-gray-500"
          >
            Return to login
          </button>
        </Link>
      </div>

      <form className="w-[60%] mt-10">
        <h2 className="text-gray-200 text-2xl mb-3">Register</h2>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            value={email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="flex gap-5">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              value={password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              value={passwordConformation}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setPasswordConformation(e.target.value);
              }}
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="text-gray-200 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-blue-800"
            onClick={handleUserSubmit}
          >
            Register
          </button>
          {showResponse ? (
            <div>
              <p className="text-gray-200 text-sm ml-5">{registerResponse}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
