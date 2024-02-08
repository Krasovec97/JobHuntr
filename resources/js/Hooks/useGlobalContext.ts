import {GlobalContext} from "../Context/GlobalContext";
import {useContext} from "react";

export default function () {
    const useGlobalContext = useContext(GlobalContext);

    if (!useGlobalContext) alert("Use global context must be used within a global provider");

    return useGlobalContext;
}
