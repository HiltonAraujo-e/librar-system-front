
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  BookOpen,
  Search,
  Heart,
  User,
  LogOut,
  BookMarked,
  Layers,
  Award,
  LogIn,
  Clock,
  BookIcon,
  HelpCircle,
  Bell,
  BarChart2,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
// import { toast } from "./ui/use-toast";
import Link from "next/link";

export function AppSidebar() {
  //   const { user, isAuthenticated, logout } = useAuth();
  //   const location = useLocation();

  // const handleLogout = () => {
  //     logout();
  //     toast.success("Logged out successfully");
  // };

  // Common menu items for all users
  const commonMenuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Search",
      url: "/library/search",
      icon: Search,
    },
    {
      title: "Categories",
      url: "/library/categories",
      icon: Layers,
    },
    {
      title: "New Releases",
      url: "/library/new-releases",
      icon: BookOpen,
    },
    {
      title: "Top Rated",
      url: "/library/top-rated",
      icon: Award,
    },
    {
      title: "My Library",
      url: "/library/my-library",
      icon: BookMarked,
    },
    {
      title: "Favorites",
      url: "/library/favorites",
      icon: Heart,
    },
    {
      title: "Reading History",
      url: "/library/reading-history",
      icon: Clock,
    },
    {
      title: "My Loans",
      url: "/library/loans",
      icon: BookIcon,
    },
    {
      title: "Notifications",
      url: "/library/notifications",
      icon: Bell,
    },
    {
      title: "Statistics",
      url: "/library/statistics",
      icon: BarChart2,
    },
  ];

  // Menu items for authenticated users only
  const authenticatedMenuItems = [
    {
      title: "My Library",
      url: "/my-library",
      icon: BookMarked,
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: Heart,
    },
    {
      title: "Reading History",
      url: "/reading-history",
      icon: Clock,
    },
    {
      title: "My Loans",
      url: "/loans",
      icon: BookIcon,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: BarChart2,
    },
  ];

  // Support and help items
  const supportItems = [
    {
      title: "Help & FAQs",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];
  // rounded-r-lg
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground">
        <BookOpen className="h-6 w-6" />
        <span className="font-heading font-semibold text-xl">BookWorm</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* {isAuthenticated && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground">Personal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {authenticatedMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        tooltip={item.title}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )} */}

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {isAuthenticated ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === "/profile"}
                      tooltip="Profile"
                    >
                      <Link to="/profile" className="flex items-center gap-2">
                        <div className="flex items-center justify-center bg-primary/10 rounded-full p-1">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Logout"
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Login / Sign Up"
                    className="text-primary"
                  >
                    <Link to="/profile">
                      <LogIn />
                      <span>Login / Sign Up</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )} */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Login / Sign Up"
                  className="text-primary"
                >
                  <Link href="/profile">
                    <LogIn />
                    <span>Login / Sign Up</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}