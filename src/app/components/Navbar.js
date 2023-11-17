import Link from 'next/link';
import React, { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);


  return (
    <div className='w-full h-20 flex justify-between items-center px-8 text-black'>
      <h1 className='text-2xl font-bold rounded-md border'><span className='text-[#c5862e]'>$</span> FXT/APP</h1>
      <ul className='flex items-center'>
        <li className='p-4'>
          <Menu as='div' className='relative inline-block text-left'>
            <Menu.Button>Trades</Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-100'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/trades/add'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Add Trade
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/trades"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Trade List
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/trades/stats"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Trade Stats
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className='p-4'>Assets</li>
        <li className='p-4'><Link href="/contact">Contact</Link></li>
        <li className='p-4'><Link href="/about">About</Link></li>
        <li className='p-4'>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                Account
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                <div className='py-1'>
                  {!username ? (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/login"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Log In
                        </Link>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/logout"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
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
                        <Link href="/account/register"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Register
                        </Link>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/update"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Update
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                </div>
                  {username ? (
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/account/current'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                          )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/account/delete'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
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
    </div>
  );
};

export default Navbar;