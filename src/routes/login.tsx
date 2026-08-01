import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { userStore } from '#/store/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isLoggedin = useSelector(userStore, (state) => state.isLoggedIn)

  // Если уже залогинены — сразу на /create-card
  useEffect(() => {
    if (isLoggedin) {
      navigate({ to: '/projects', replace: true })
    }
  }, [navigate, isLoggedin])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { token } = { token: 'fake-token' }
      // Обновляем store
      userStore.setState(() => {
        return {
          isLoggedIn: true,
          token,
        }
      })
      // Редирект
      navigate({ to: '/create-card', replace: true })
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { token } = { token: 'fake-token' }
      // Обновляем store
      userStore.setState(() => {
        return {
          isLoggedIn: true,
          token,
        }
      })
      // Редирект
      navigate({ to: '/create-card', replace: true })
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка')
    }
  }

  const handleYandexAuth = async () => {
    setError('')
    try {
      const { token } = { token: 'fake-token' }
      userStore.setState(() => {
        return {
          isLoggedIn: true,
          token,
        }
      })
      navigate({ to: '/create-card', replace: true })
    } catch (err: any) {
      setError(err.message || 'Ошибка Яндекс ID')
    }
  }

  return (
    <div className="page-wrap flex justify-center px-4 py-8">
      <Tabs defaultValue="login" className="w-full max-w-md rise-in">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 p-1">
          <TabsTrigger value="login" className="rounded-md cursor-pointer">
            Вход
          </TabsTrigger>
          <TabsTrigger value="register" className="rounded-md cursor-pointer">
            Регистрация
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="island-shell border-0 shadow-none sm:border sm:shadow-sm sm:bg-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
                С возвращением
              </CardTitle>
              <CardDescription className="text-[var(--sea-ink-soft)]">
                Войдите в свой аккаунт, чтобы продолжить работу.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">
                    Логин <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    className="bg-background"
                    id="login-username"
                    placeholder="Введите логин"
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    Пароль <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    className="bg-background"
                    id="login-password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive font-medium">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full font-semibold cursor-pointer"
                >
                  Войти
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleYandexAuth}
                  className="w-full font-medium cursor-pointer"
                >
                  Войти через Яндекс ID
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="island-shell border-0 shadow-none sm:border sm:shadow-sm sm:bg-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
                Создать аккаунт
              </CardTitle>
              <CardDescription className="text-[var(--sea-ink-soft)]">
                Зарегистрируйтесь, чтобы начать создавать карточки.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">
                    Логин <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    className="bg-background"
                    id="register-username"
                    placeholder="Введите логин"
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    className="bg-background"
                    id="register-email"
                    type="email"
                    placeholder="Введите почту"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">
                    Пароль <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    className="bg-background"
                    id="register-password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive font-medium">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full font-semibold">
                  Зарегистрироваться
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[var(--line)]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background sm:bg-card px-2 text-[var(--sea-ink-soft)]">
                      Или
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleYandexAuth}
                  className="w-full font-medium"
                >
                  Войти через Яндекс ID
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
