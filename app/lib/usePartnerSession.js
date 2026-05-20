import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';

/**
 * "Auth" for the demo partner portal — a single localStorage flag. Phase 2
 * replaces this with Supabase Auth (see CLAUDE.md §2). The hook exposes
 * `isLoggedIn`, `login`, `logout`, plus a `hydrated` flag so SSR can render
 * neutrally and the client takes over after mount.
 */

const KEY = 'keystonne:demo-partner-logged-in';

export function usePartnerSession() {
  const [hydrated, setHydrated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setLoggedIn(window.localStorage.getItem(KEY) === '1');
    setHydrated(true);
  }, []);

  function login() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(KEY, '1');
    }
    setLoggedIn(true);
  }

  function logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(KEY);
    }
    setLoggedIn(false);
  }

  return {hydrated, isLoggedIn: loggedIn, login, logout};
}

/**
 * Convenience guard — call from a route's component to redirect to login
 * if the demo partner isn't "logged in". Must be invoked after mount; we
 * skip the redirect during SSR (hydrated=false).
 */
export function useRequirePartnerLogin() {
  const {hydrated, isLoggedIn} = usePartnerSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !isLoggedIn) navigate('/partner/login');
  }, [hydrated, isLoggedIn, navigate]);

  return {hydrated, isLoggedIn};
}
