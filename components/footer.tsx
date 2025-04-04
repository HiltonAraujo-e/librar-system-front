
import { Home, BookOpen, User, Heart, BookMarked, HelpCircle, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <footer className="fixed bottom-0 left-0 right-0 border-t bg-background z-40 p-4">
                <div className="flex items-center justify-around py-2">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
                            <Home className="h-5 w-5" />
                            <span className="text-xs">Home</span>
                        </Button>
                    </Link>
                    <Link href="/search">
                        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
                            <BookOpen className="h-5 w-5" />
                            <span className="text-xs">Search</span>
                        </Button>
                    </Link>
                    <Link href="/favorites">
                        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
                            <Heart className="h-5 w-5" />
                            <span className="text-xs">Favorites</span>
                        </Button>
                    </Link>
                    <Link href="/my-library">
                        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
                            <BookMarked className="h-5 w-5" />
                            <span className="text-xs">Library</span>
                        </Button>
                    </Link>
                    <Link href="/profile">
                        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
                            <User className="h-5 w-5" />
                            <span className="text-xs">Profile</span>
                        </Button>
                    </Link>
                </div>
            </footer>
        );
    }

    return (
        <footer className="border-t bg-background p-4">
            <div className="container py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="font-heading font-semibold text-xl">BookWorm</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Your personal digital library, explore, discover, and enjoy reading.
                    </p>
                </div>

                <div>
                    <h4 className="font-heading font-medium text-base mb-4">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                        <li><Link href="/new-releases" className="hover:text-primary transition-colors">New Releases</Link></li>
                        <li><Link href="/top-rated" className="hover:text-primary transition-colors">Top Rated</Link></li>
                        <li><Link href="/search" className="hover:text-primary transition-colors">Search</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading font-medium text-base mb-4">Account</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
                        <li><Link href="/my-library" className="hover:text-primary transition-colors">My Library</Link></li>
                        <li><Link href="/favorites" className="hover:text-primary transition-colors">Favorites</Link></li>
                        <li><Link href="/reading-history" className="hover:text-primary transition-colors">Reading History</Link></li>
                        <li><Link href="/loans" className="hover:text-primary transition-colors">My Loans</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading font-medium text-base mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                        <li><Link href="/settings" className="hover:text-primary transition-colors">Settings</Link></li>
                        <li><Link href="/help" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/help" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t">
                <div className="container py-4 text-sm text-center text-muted-foreground">
                    &copy; {new Date().getFullYear()} BookWorm Digital Library. All rights reserved.
                </div>
            </div>
        </footer>
    );
}