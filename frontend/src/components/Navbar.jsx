import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  Handshake,
  Home,
  LogOut,
  Menu,
  Plus,
  Repeat,
  Search,
  Settings,
  User,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const primaryLinks = [
  { to: '/skills', label: 'Habilidades', icon: BookOpen },
]

const authLinks = [
  { to: '/requests', label: 'Solicitudes', icon: Handshake },
  { to: '/exchanges', label: 'Intercambios', icon: Repeat },
]

function Navbar() {
  const { token, user, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '')

  const isAdmin = token && user?.role_id === 1
  const publishHref = token ? '/my-skills' : '/login'
  const initials = (user?.username || 'SS').slice(0, 2).toUpperCase()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchValue.trim()
    navigate(query ? `/skills?q=${encodeURIComponent(query)}` : '/skills')
  }

  const allLinks = [
    ...primaryLinks,
    ...(token ? authLinks : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Admin', icon: Settings }] : []),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:hidden lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-slate-50"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <span className="block font-semibold uppercase tracking-[0.18em] text-slate-900">
              SkillSwap
            </span>
            <span className="block text-xs text-slate-500">Intercambio de habilidades</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="rounded-full bg-blue-600 px-3 text-white hover:bg-blue-700">
            <Link to={publishHref}>
              <Plus size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Publicar</span>
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              >
                <Menu size={18} aria-hidden="true" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="top-3 right-3 bottom-auto h-auto max-h-[calc(100dvh-1.5rem)] w-[min(20rem,calc(100vw-1.5rem))] max-w-none overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl sm:top-4 sm:right-4 sm:max-h-[calc(100dvh-2rem)]"
            >
              <SheetHeader className="px-0 pt-1 pr-8 pb-0">
                <SheetTitle className="text-left text-base text-slate-900">Navegación</SheetTitle>
                <SheetDescription className="text-left text-xs text-slate-500">
                  Acceso rápido a SkillSwap.
                </SheetDescription>
              </SheetHeader>

              {token ? (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Sesión activa</p>
                    <p className="truncate text-base font-semibold text-slate-900">
                      {user?.username ?? 'usuario'}
                    </p>
                  </div>
                </div>
              ) : null}

              <nav className="mt-4 grid gap-1" aria-label="Móvil">
                {allLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900',
                            isActive && 'border-blue-100 bg-blue-50 text-blue-700',
                          )
                        }
                      >
                        <Icon size={18} aria-hidden="true" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SheetClose>
                  )
                })}
              </nav>

              <Separator className="my-3 bg-slate-200" />

              <div className="grid gap-2">
                {token ? (
                  <>
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                      >
                        <Link to="/profile">
                          <User size={16} aria-hidden="true" />
                          Perfil
                        </Link>
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      variant="ghost"
                      className="justify-start rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={signOut}
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Salir
                    </Button>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className="justify-start rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                      >
                        <Link to="/register">Registro</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden flex-col w-full lg:flex">
        {/* Fila superior: Logo, Buscador, Acciones */}
        <div className="mx-auto flex min-h-20 w-full max-w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-12 xl:px-16">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-slate-50"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              <BookOpen size={18} aria-hidden="true" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-semibold uppercase tracking-[0.18em] text-slate-900">
                SkillSwap
              </span>
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-center px-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[800px]">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Buscar habilidades (ej. React, Backend, Inglés)..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-12 w-full rounded-full border border-slate-200 bg-slate-50/80 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </form>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3">


            {token ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Avatar size="default">
                      <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="max-w-32 truncate text-sm font-medium text-slate-900">
                        {user?.username ?? 'usuario'}
                      </span>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Tu cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User size={16} aria-hidden="true" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <Settings size={16} aria-hidden="true" />
                        Administración
                      </Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(event) => {
                      event.preventDefault()
                      signOut()
                    }}
                  >
                    <LogOut size={16} aria-hidden="true" />
                    Salir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="shrink-0 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="shrink-0 rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                >
                  <Link to="/register">Registro</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Fila inferior: Navegación tipo Amazon (fondo oscuro) */}
        <div className="w-full bg-slate-800 text-slate-200">
          <div className="mx-auto flex h-12 w-full max-w-full items-center justify-center gap-8 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-x-auto">
            {allLinks.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors hover:text-white',
                      isActive ? 'border-blue-400 text-white' : 'border-transparent'
                    )
                  }
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </NavLink>
              )
            })}
            
            <div className="h-4 w-px bg-slate-600 mx-1" aria-hidden="true" />
            
            <Link 
              to={publishHref}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-500/10 border border-blue-400/30 px-4 py-1.5 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-blue-200"
            >
              <Plus size={16} aria-hidden="true" />
              Publicar
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
