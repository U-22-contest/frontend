"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, BookOpen, Menu, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeSwitcher } from "./theme-switcher"

// 仮のユーザー認証状態
const isAuthenticated = true

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl hidden md:inline-block">NovelAI</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>探索</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/rankings"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">ランキング</div>
                          <p className="text-sm leading-tight text-muted-foreground">人気の作品をチェック</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/new-releases"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">新着作品</div>
                          <p className="text-sm leading-tight text-muted-foreground">最近投稿された作品</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          className="group grid h-full w-full select-none grid-cols-4 place-items-center gap-1 rounded-md p-4 no-underline outline-none focus:shadow-md"
                          href="/genres"
                        >
                          {["ファンタジー", "SF", "恋愛", "日常"].map((genre) => (
                            <div key={genre} className="text-center rounded-md px-3 py-2 hover:bg-muted">
                              <div className="text-sm font-medium">{genre}</div>
                            </div>
                          ))}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/write" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>執筆する</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="作品名、作者名で検索..." className="w-[200px] md:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
          )}

          <ThemeSwitcher />

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ユーザー" />
                      <AvatarFallback>ユ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">ユーザー名</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex w-full">
                      プロフィール
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="flex w-full">
                      ダッシュボード
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/bookmarks" className="flex w-full">
                      ブックマーク
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>ログアウト</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild>
                <Link href="/register">登録</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center text-lg font-semibold"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span>NovelAI</span>
                </Link>
                <Link
                  href="/explore"
                  className="text-muted-foreground"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  作品を探す
                </Link>
                <Link
                  href="/rankings"
                  className="text-muted-foreground"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  ランキング
                </Link>
                <Link
                  href="/write"
                  className="text-muted-foreground"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  執筆する
                </Link>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  ダッシュボード
                </Link>
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button asChild variant="outline">
                      <Link href="/login">ログイン</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">登録</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

