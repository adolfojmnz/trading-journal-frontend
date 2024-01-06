import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogoutDialogOpen = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLogoutDialogClose();
  };

  const logout = async () => {
    localStorage.clear("username");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);

    // TODO: blacklist tokens

    window.location.href = "/";
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  return (
    <div className="w-full h-12 flex justify-between items-center px-8 text-black bg-gray-100">
      <Link href="/">
        <div className="flex items-center">
          <img
            src="https://i.postimg.cc/7LgXCjQ2/logo-bg-white.png"
            alt="Logo"
            className="mr-2 h-10"
            sizes="40"
          />
          <h1 className="text-2xl font-bold text-gray-800">FXT/APP</h1>
        </div>
      </Link>
      <ul className="flex items-center">
        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>Indicators</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/indicators"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Indicators
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/reports"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Reports
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/countries"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Countries
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>Trades</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/trades"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        List
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/trades/add"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Add
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/trades/metrics"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Metrics
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>Assets</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/assets"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        List
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className="p-4">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="p-4">
          <Link href="/about">About</Link>
        </li>
        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                Account
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  {!username ? (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/login"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Log In
                        </Link>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          onClick={handleLogoutDialogOpen}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Log Out
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  {!username ? (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/register"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Register
                        </Link>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/update"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Update
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                </div>
                {username ? (
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/current"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/delete"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete Account
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                ) : (
                  <span></span>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      </ul>
      {isLogoutDialogOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 bg-white rounded p-4">
          <h2 className="text-lg font-bold">
            Are you sure you want to log out?
          </h2>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleLogoutDialogClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;