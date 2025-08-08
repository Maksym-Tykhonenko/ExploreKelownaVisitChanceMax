import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserState = Record<string, unknown> | null;

interface IUserContext {
  user: UserState;
  modifyUser: (user: UserState) => Promise<void>;
  clearUser: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  modifyUser: async () => {},
  clearUser: async () => {},
});

type Props = { children: ReactNode };

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserState>(null);

  const loadKelownalUserFromStorage = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      if (__DEV__) console.error('Error loading user:', error);
    }
  }, []);

  useEffect(() => {
    loadKelownalUserFromStorage();
  }, [loadKelownalUserFromStorage]);

  const saveKelownalUserToStorage = useCallback(async (data: UserState) => {
    try {
      if (data) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(data));
      } else {
        await AsyncStorage.removeItem('currentUser');
      }
      setUser(data);
    } catch (error) {
      if (__DEV__) console.error('Error saving user:', error);
    }
  }, []);

  const modifyUser = useCallback(async (newUser: UserState) => {
    await saveKelownalUserToStorage(newUser);
  }, [saveKelownalUserToStorage]);

  const clearUser = useCallback(async () => {
    await saveKelownalUserToStorage(null);
  }, [saveKelownalUserToStorage]);

  return (
    <UserContext.Provider value={{ user, modifyUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

