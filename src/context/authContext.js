// AuthContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
//import { supabase } from '@/lib/supabase';
import { createClient } from '@/lib/client';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const supabase = createClient();
  useEffect(() => {
    //console.log("authContext fectchUser");
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log("authContext call fetchUser");
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    console.log("subscribed");
    return () => {
      authListener.subscription.unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    //setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);