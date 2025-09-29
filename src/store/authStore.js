import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,

  // initialize from Supabase on app load
  init: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({ session, user: session?.user ?? null, loading: false });

      // listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user ?? null });
      });
    } catch {
      set({ session: null, user: null, loading: false });
    }
  },

  // convenience getters
  accessToken: () => get().session?.access_token || null,

  // actions (optional if you still call supabase directly in components)
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ session: data.session, user: data.session?.user ?? null });
    return data;
  },

  signUp: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // If confirmations ON, session is null; we just keep state.
    set({ session: data.session ?? null, user: data.session?.user ?? null });
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
