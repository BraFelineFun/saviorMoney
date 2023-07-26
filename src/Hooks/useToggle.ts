import {useCallback, useState} from "react";

const useToggle = (initialState: boolean): [boolean, () => void] => {
    const [isToggled, setIsToggled] = useState<boolean>(initialState);

    const toggle = useCallback(()=>{
        setIsToggled(!isToggled);
    }, [isToggled])

    return [isToggled, toggle];
}

export default useToggle;