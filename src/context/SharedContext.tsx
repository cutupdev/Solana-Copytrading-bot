import { createContext, useContext, useState } from "react";

//  @ts-ignore
const SharedContext = createContext();

export function SharedProvider({ children }: { children: any }) {
    const [sharedValue, setSharedValue] = useState({
        tempWalletPubkey : "",
        tempWalletSeckey : "",
    });

    return (
        <SharedContext.Provider value={{ sharedValue, setSharedValue }
        }>
            {children}
        </SharedContext.Provider>
    );
}

export function useSharedContext() {
    return useContext(SharedContext);
}
