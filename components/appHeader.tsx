"use client"
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useGet } from "@/data/hooks";
import { API_ENDPOINTS } from "@/data/client/endpoints";

export function AppHeader() {
    const isMobile = useIsMobile();
    const navigate = useRouter();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_ONLINE_USER,
    })
    const user = data?.data

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search')?.toString() || '';
        if (query.trim()) {
            navigate.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="flex items-center gap-2 py-2">
            <form onSubmit={handleSearch} className="flex-1">
                <div className="relative flex items-center">
                    <Input
                        name="search"
                        placeholder="Search books, authors, genres..."
                        className="w-full pl-8"
                        autoFocus={isSearchExpanded}
                        onBlur={() => isMobile && setIsSearchExpanded(false)}
                    />
                    <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1"
                    >
                        Search
                    </Button>
                </div>
            </form>

            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex flex-col">
                                <p className="font-medium">Book return reminder</p>
                                <p className="text-sm text-muted-foreground">
                                    "The Silent Patient" is due in 2 days
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex flex-col">
                                <p className="font-medium">New arrival alert</p>
                                <p className="text-sm text-muted-foreground">
                                    "Project Hail Mary" by Andy Weir is now available
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer justify-center">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                                <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate.push("/profile")}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate.push("/my-library")}>
                            My Library
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate.push("/settings")}>
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}