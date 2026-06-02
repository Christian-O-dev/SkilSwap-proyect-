import { Link, NavLink } from 'react-router-dom'
import {
  BookOpen,
  Handshake,
  Home,
  LogOut,
  Menu,
  Plus,
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
  {
    to: '/',
    label: 'Inicio',
    icon: Home,
  },
  {
    to: '/skills',
    label: 'Habilidades',
    icon: BookOpen,
  },
]

const authLinks = [
  {
    to: '/requests',
    label: 'Solicitudes',
    icon: Handshake,
  },
]

function Navbar() {
  const { token, user, signOut } = useAuth()
  const isAdmin = token && user?.role_id === 1
  const publishHref = token ? '/my-skills' : '/login'
  const initials = (user?.username || 'SS').slice(0, 2).toUpperCase()

  const allLinks = [
    ...primaryLinks,
    ...(token ? authLinks : []),
    ...(isAdmin
      ? [
          {
            to: '/admin',
            label: 'Admin',
            icon: Settings,
          },
        ]
      : []),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-50 transition hover:border-cyan-300/40 hover:bg-white/8"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-amber-300 text-slate-950 shadow-lg shadow-cyan-400/20">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <span className="block font-semibold tracking-[0.18em] text-slate-50 uppercase">
              SkillSwap
            </span>
            <span className="block text-xs text-slate-400">Intercambio de habilidades</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex" aria-label="Principal">
          {allLinks.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/6 hover:text-slate-50',
                    isActive && 'bg-white/10 text-slate-50 shadow-sm',
                  )
                }
              >
                <Icon size={16} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild className="rounded-full bg-cyan-300 text-slate-950 hover:bg-cyan-200">
            <Link to={publishHref}>
              <Plus size={16} aria-hidden="true" />
              Publicar habilidad
            </Link>
          </Button>

          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-slate-100 transition hover:border-cyan-300/40 hover:bg-white/10"
                >
                  <Avatar size="default">
                    <AvatarFallback className="bg-cyan-200 text-xs font-semibold text-slate-950">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Perfil</span>
                    <span className="text-sm font-medium text-slate-50">{user?.username ?? 'usuario'}</span>
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
                      Administracion
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
              <Button asChild variant="ghost" className="rounded-full text-slate-100 hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 text-slate-50 hover:bg-white/10">
                <Link to="/register">Registro</Link>
              </Button>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="rounded-full bg-cyan-300 px-3 text-slate-950 hover:bg-cyan-200">
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
                className="rounded-full border-white/10 bg-white/5 text-slate-50 hover:bg-white/10"
              >
                <Menu size={18} aria-hidden="true" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[22rem] border-white/10 bg-slate-950/96 text-slate-50">
              <SheetHeader className="px-0 pt-8">
                <SheetTitle className="text-left text-slate-50">Navegacion</SheetTitle>
                <SheetDescription className="text-left text-slate-400">
                  Accede rapido a las secciones principales de SkillSwap.
                </SheetDescription>
              </SheetHeader>

              {token ? (
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-cyan-200 font-semibold text-slate-950">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Sesion activa</p>
                    <p className="truncate text-base font-semibold text-slate-50">{user?.username ?? 'usuario'}</p>
                  </div>
                </div>
              ) : null}

              <nav className="mt-6 grid gap-2" aria-label="Movil">
                {allLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-white/10 hover:bg-white/6 hover:text-slate-50',
                            isActive && 'border-white/10 bg-white/10 text-slate-50',
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

              <Separator className="my-6 bg-white/10" />

              <div className="grid gap-3">
                {token ? (
                  <>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="justify-start rounded-2xl border-white/10 bg-white/5 text-slate-50 hover:bg-white/10">
                        <Link to="/profile">
                          <User size={16} aria-hidden="true" />
                          Perfil
                        </Link>
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      variant="ghost"
                      className="justify-start rounded-2xl text-rose-200 hover:bg-rose-500/10 hover:text-rose-100"
                      onClick={signOut}
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Salir
                    </Button>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button asChild variant="ghost" className="justify-start rounded-2xl text-slate-100 hover:bg-white/10">
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="justify-start rounded-2xl border-white/10 bg-white/5 text-slate-50 hover:bg-white/10">
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
    </header>
  )
}

export default Navbar
