
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function AppHeader() {
    const isMobile = useIsMobile();
    const navigate = useRouter();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

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

            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}