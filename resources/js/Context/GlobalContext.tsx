import {createContext, useState} from "react";
import FlashNotification from "../Components/FlashNotification";


interface GlobalContextData {
    FlashNotification: {
        setText(text: string): void,
        setIsOpen(isOpen: string): void
        setStyle(background: 'primary'|'success'|'danger'): void
    }
}

export const GlobalContext = createContext<GlobalContextData|undefined>(undefined);

export default function ({children}) {
    const [text, setText] = useState("");
    const [style, setStyle] = useState<'primary'|'success'|'danger'>("primary");
    const [isOpen, setIsOpen] = useState('false');

    const onClose = () => setIsOpen('false');

    let context = {
        FlashNotification: {
            setText,
            setIsOpen,
            setStyle
        }
    }

    return (
        <GlobalContext.Provider value={context}>
            <FlashNotification text={text} isOpen={isOpen} onClose={onClose} style={style} />
            {children}
        </GlobalContext.Provider>
    )
}
