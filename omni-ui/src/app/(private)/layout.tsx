'use client'

import * as React from 'react';
import {useEffect} from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import useSWR from "swr";
import {ProfileGetFetcher} from "@/lib/auth/profile.fetcher";
import {redirect, usePathname} from "next/navigation";

const DRAWER_WIDTH = 180;

const LINKS = [
    {text: 'Dashboard', href: '/', icon: HomeIcon},
    {text: 'Events', href: '/events', icon: EmojiEventsIcon},
];
const QUICK_LINKS = [
    {text: 'Logout', href: '/logout', icon: LogoutIcon},
];

export default function Layout({children}: { children: React.ReactNode }) {
    const {data: profile, isValidating, isLoading, error} = useSWR('profile', ProfileGetFetcher)
    const pathname = usePathname()

    useEffect(() => {
        console.log(error, profile, isLoading)

        if (error) {
            redirect('/logout')
        }
    }, [pathname])

    return (
        <ThemeRegistry>
            <AppBar position="fixed" sx={{zIndex: 2000}}>
                <Toolbar sx={{backgroundColor: 'background.paper'}}>
                    <DashboardIcon sx={{color: '#444', mr: 2, transform: 'translateY(-2px)'}}/>
                    <Typography variant="h6" noWrap component="div" color="black">
                        {profile && (<span>Welcome {profile.firstName} {profile.lastName}</span>)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        top: ['48px', '56px', '64px'],
                        height: 'auto',
                        bottom: 0,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Divider/>
                <List>
                    {LINKS.map(({text, href, icon: Icon}) => (
                        <ListItem key={href} disablePadding>
                            <ListItemButton component={Link} href={href} selected={href === pathname}>
                                <ListItemIcon>
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{mt: 'auto'}}/>
                <List>
                    {QUICK_LINKS.map(({text, icon: Icon, href}) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton component={Link} href={href} selected={href === pathname}>
                                <ListItemIcon>
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    ml: `${DRAWER_WIDTH}px`,
                    mt: ['48px', '56px', '64px'],
                    p: 2,
                }}
            >
                {children}
            </Box>
        </ThemeRegistry>
    );
}
