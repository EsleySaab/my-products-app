"use client"

import { Heart } from "lucide-react"
import NextLink from "next/link"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>MyProductsApp &copy; {year}. Todos os direitos reservados.</span>
        <span className="flex items-center gap-1">
          Feito com <Heart size={16} className="text-red-500" /> por{" "}
          <NextLink href="https://github.com/EsleySaab" className="underline">
            Esley Santana
          </NextLink>
        </span>
      </div>
    </footer>
  )
}
