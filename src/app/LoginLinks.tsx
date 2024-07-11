'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AppLogo from '@/components/AppLogo'
import Button from '@/components/Button'
import { useEffect } from 'react'
import { VscMenu } from "react-icons/vsc";


const LoginLinks = () => {
    const { fetchUser, user, logout } = useAuth()
    
    useEffect(() => {
      fetchUser();
    }, [fetchUser]);
    

    return (
      <div className="fixed navbar bg-slate-100 top-0 right-0 px-6 py-3">
        <div className="flex-1">
          <Link href={'/'}>
            <AppLogo />
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0}>
              <Button className="flex items-center text-gray-500">
                <VscMenu className="w-5 h-5" />
              </Button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu gap-2 bg-slate-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {user ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business"
                    >
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/investment"
                    >
                      Investment
                    </Link>
                  </li>
                  <li>
                    {/* <Button
                      className="bg-white text-red-500 border-red-500 hover:text-red-700 hover:border-red-300 focus:text-red-700 focus:border-red-300"
                      onClick={logout}
                    >
                      Logout
                    </Button> */}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-sm text-gray-700">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link href="/register" className="text-sm text-gray-700">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default LoginLinks
