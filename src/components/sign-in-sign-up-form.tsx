"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client'
import { Separator } from "@/components/ui/separator";


export function SignInSignUpForm( {initialTab = 'login'} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState(initialTab);
    const [repeatPassword, setRepeatPassword] = useState('')

    const [ssoLoading, setSsoLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push('/protected')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setSsoLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setSsoLoading(false)
    }
  }

  const updateURI = (value: string) => {
    const url = new URL(window.location.href);
    // update url path to reflect the current tab value
    url.pathname = `auth/${value}`;
    window.history.replaceState({}, '', url.toString());
    setActiveTab(value);
  }

    return (
        <Card className="w-full max-w-md mx-auto">
            <Tabs defaultValue={initialTab} onValueChange={updateURI}>
                <CardHeader className="flex flex-col gap-4">
                    <h1 className="text-center text-2xl font-bold">Get Started</h1>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {error && (
                        <div className="bg-destructive/15 text-white text-sm p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="sign-up">
                        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Input
                            id="repeat-password"
                            type="password"
                            placeholder="Repeat Password"
                            required
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </TabsContent>
                    <div className="flex gap-3 items-center">
                        <Separator className="flex-1" />
                        <p className="text-center text-sm text-muted-foreground">or</p>
                        <Separator className="flex-1" />
                    </div>
                    <form onSubmit={handleSocialLogin}>
                        <div className="flex flex-col gap-6">
                        {error && <p className="text-sm text-destructive-500">{error}</p>}
                        <Button type="submit" className="w-full" disabled={ssoLoading}>
                            {activeTab === 'login' && (
                                ssoLoading ? 'Logging in...' : 'Sign in with Google'
                            )}
                            {activeTab === 'sign-up' && (
                                ssoLoading ? 'Signing up...' : 'Sign up with Google'
                            )}
                        </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground text-center">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </CardFooter>
            </Tabs>
        </Card>
    );
}
