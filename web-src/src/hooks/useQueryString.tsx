import {useLocation} from "react-router-dom";

export function useQueryString(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryString = Object.fromEntries(searchParams.entries());
    return queryString;
}