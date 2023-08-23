'use client'
import useSWR from "swr";
import {useEffect} from "react";
import {redirect} from "next/navigation";
import {LogoutPostFetcher} from "@/lib/auth/logout.fetcher";

export default function LogoutPage() {
    const {data,isLoading } = useSWR('logout',LogoutPostFetcher)

    useEffect(()=> {
        redirect('/login')
    }, [data])

    return (<>
        {isLoading ? 'Logging out': 'Redirecting'}
    </>);
}