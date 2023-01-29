import { useState } from "react";

const useOpen = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, handleOpen, handleClose, toggleOpen };
};

export default useOpen;
