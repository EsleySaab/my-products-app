"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar"
import { ThemeSwitch } from "@/components/theme-switch"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@heroui/button"
import { Avatar, AvatarIcon } from "@heroui/avatar"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export const Navbar = () => {
  const { token, user, logout } = useAuthStore()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="px-4">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/" className="text-xl font-bold">
            MyProductsApp
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 items-center">
        <ThemeSwitch />

        {token && (
          <>
            <NavbarItem>
              <Button
                size="sm"
                onClick={() => router.push("/products/create")}
                className="flex items-center gap-2"
              >
                <span className="text-lg font-bold">+</span>
                Criar Produto
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                size="sm"
                onClick={() => router.push("/products")}
                className="flex items-center gap-2 bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300"
              >
                Meus Produtos
              </Button>
            </NavbarItem>

            <div className="relative" ref={menuRef}>
              <NavbarItem>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="focus:outline-none"
                >
                  <Avatar className="cursor-pointer transition-transform hover:scale-105">
                    <AvatarIcon />
                  </Avatar>
                </button>
              </NavbarItem>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => router.push("/profile")}
                  >
                    Perfil
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </NavbarContent>
    </HeroUINavbar>
  )
}
