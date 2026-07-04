import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

type TokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
}
