// AuthContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
//import { supabase } from '@/lib/supabase';
import { createClient } from '@/lib/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const supabase = createClient();
  useEffect(() => {
    //console.log("authContext fectchUser");
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user||null);
      setIsLogin(session?.user ? true : false);
      //console.log('isLoading',isLogin);
      //console.log("authContext call fetchUser");
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setIsLogin(session?.user ? true : false);
    });
    //console.log("subscribed");
    return () => {
      authListener.subscription.unsubscribe();
      //console.log("unsubscribed");
    };
  }, []);

  const signOut = async () => {
    const {error}=await supabase.auth.signOut();
    if(error){
      console.error('Sign out error:',error.message);
    }else{
      setUser(null);
      setIsLogin(false);
    }
    
  };

  return (
    <AuthContext.Provider value={{ user,isLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);