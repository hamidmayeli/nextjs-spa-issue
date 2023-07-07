import { createContext, useState, useMemo, useCallback } from "react";

interface ICurrentUser {
    token?: string
}

export const AppContext = createContext({} as {
    currentUser?: ICurrentUser,
    login: (user: ICurrentUser) => void,
});

const userStorageKey = "key";

export default function AppContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem(userStorageKey) ?? "{}") as ICurrentUser);

    const login = useCallback((user: ICurrentUser) => {
        localStorage.setItem(userStorageKey, JSON.stringify(user));
        setCurrentUser(user);
    }, []);

    const contextValue = useMemo(() => ({
        currentUser,
        login,
    }), [currentUser, login]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
