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
import { Input } from "@heroui/input"
import { Avatar, AvatarIcon } from "@heroui/avatar"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

export const Navbar = () => {
  const { token, logout } = useAuthStore()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [search, setSearch] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    router.push("/login")
    setMobileMenuOpen(false)
    setMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/products/${search.trim()}`)
      setSearch("")
      setMobileMenuOpen(false)
    }
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
    <>
      <HeroUINavbar maxWidth="xl" position="sticky" className="px-4">
        <NavbarContent justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink href="/" className="text-xl font-bold">
              MyProductsApp
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {token && (
          <NavbarContent
            justify="center"
            className="flex-1 max-w-md hidden sm:flex"
          >
            <form onSubmit={handleSearch} className="w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto por ID..."
                radius="full"
                className="w-full"
              />
            </form>
          </NavbarContent>
        )}

        <NavbarContent
          justify="end"
          className="gap-2 items-center hidden sm:flex"
        >
          <ThemeSwitch />
          {token && (
            <>
              <NavbarItem>
                <Button
                  size="sm"
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-2 bg-blue-700 dark:bg-blue-700 text-text-gray-100 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-blue-600"
                >
                  Dashboard
                </Button>
              </NavbarItem>

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
                  <div
                    className="cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <Avatar>
                      <AvatarIcon />
                    </Avatar>
                  </div>
                </NavbarItem>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => router.push("#")}
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

        {token && (
          <NavbarContent justify="end" className="sm:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </NavbarContent>
        )}
      </HeroUINavbar>

      {token && !mobileMenuOpen && (
        <div className="sm:hidden p-4 bg-gray-100 dark:bg-black">
          <form onSubmit={handleSearch}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto por ID..."
              radius="full"
              className="w-full"
            />
          </form>
        </div>
      )}

      {token && mobileMenuOpen && (
        <div className="sm:hidden p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-950 flex flex-col gap-2">
          <Button
            size="sm"
            onClick={() => {
              router.push("/dashboard")
              setMobileMenuOpen(false)
            }}
            className="bg-blue-700 dark:bg-blue-700 text-gray-100 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-blue-600"
          >
            Dashboard
          </Button>
          <Button
            size="sm"
            onClick={() => {
              router.push("/products/create")
              setMobileMenuOpen(false)
            }}
          >
            Criar Produto
          </Button>
          <Button
            size="sm"
            onClick={() => {
              router.push("/products")
              setMobileMenuOpen(false)
            }}
            className="bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300"
          >
            Meus Produtos
          </Button>
          <Button size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </>
  )
}
