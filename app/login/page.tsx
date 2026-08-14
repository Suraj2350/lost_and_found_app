'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="font-tag text-xs tracking-widest uppercase text-ink/60">
            Tagged
          </span>
        </div>

        <div className="bg-cream border-2 border-ink/15 rounded-sm p-8 shadow-[0_6px_0_rgba(35,38,32,0.1)]">
          <span className="font-tag text-xs tracking-[0.2em] uppercase text-brass">
            {mode === 'signin' ? 'Stub · Sign in' : 'Stub · New account'}
          </span>
          <h1 className="font-display font-bold text-3xl mt-2 mb-6">
            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="font-body text-sm text-ink/70 block mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
                />
              </div>
            )}
            <div>
              <label className="font-body text-sm text-ink/70 block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
              />
            </div>

            {error && <p className="text-brick text-sm font-body">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-cream font-tag text-sm uppercase tracking-wide py-3 rounded-sm hover:bg-teal transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-ink/60 mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="text-teal underline underline-offset-2"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="font-tag text-xs uppercase tracking-widest text-ink/50 hover:text-ink">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}