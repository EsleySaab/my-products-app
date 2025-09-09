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
import NextLink from "next/link"
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const { token, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="px-4">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/" className="text-xl font-bold">
            MyProductsApp
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <ThemeSwitch />

        {token ? (
          <NavbarItem>
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </NavbarItem>
        ) : null}
      </NavbarContent>
    </HeroUINavbar>
  )
}
