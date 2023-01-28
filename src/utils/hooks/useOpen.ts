import { useState } from "react";

const useOpen = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);

    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, open, close, toggleOpen };
};

export default useOpen;
