"use client"
import { useState } from "react";
import { Settings as SettingsIcon, LogIn, Bell, Eye, Moon, Sun, Globe, Shield, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function SettingsPage() {
    const isAuthenticated = true;

    // General preferences
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("english");
    const [fontSize, setFontSize] = useState("medium");

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [loanReminders, setLoanReminders] = useState(true);
    const [newArrivals, setNewArrivals] = useState(true);
    const [authorUpdates, setAuthorUpdates] = useState(true);
    const [systemAnnouncements, setSystemAnnouncements] = useState(true);

    // Privacy settings
    const [shareReadingHistory, setShareReadingHistory] = useState(false);
    const [showProfileToOthers, setShowProfileToOthers] = useState(true);
    const [allowRecommendations, setAllowRecommendations] = useState(true);

    // Security settings
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        toast.success(`${isDarkMode ? 'Light' : 'Dark'} mode activated`);
    };

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        // In a real app, this would call an API
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // If user is not authenticated, show a login prompt
    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
                <SettingsIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground mb-6">
                    Sign in to customize your experience and adjust your account settings.
                </p>
                <Button asChild>
                    <Link href="/profile">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in to continue
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <SettingsIcon className="h-7 w-7" />
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Customize your experience and manage your account preferences.
                </p>
            </header>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Appearance</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center">
                                                {isDarkMode ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                                                <label htmlFor="dark-mode" className="font-medium">
                                                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                                                </label>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Switch between light and dark themes
                                            </p>
                                        </div>
                                        <Switch
                                            id="dark-mode"
                                            checked={isDarkMode}
                                            onCheckedChange={toggleDarkMode}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="font-size" className="block font-medium">
                                            <Eye className="inline-block mr-2 h-4 w-4" />
                                            Font Size
                                        </label>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Adjust the size of text throughout the app
                                        </p>
                                        <Select value={fontSize} onValueChange={setFontSize}>
                                            <SelectTrigger id="font-size">
                                                <SelectValue placeholder="Select font size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                                <SelectItem value="x-large">Extra Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Language</h2>
                                <div className="space-y-2">
                                    <label htmlFor="language" className="block font-medium">
                                        <Globe className="inline-block mr-2 h-4 w-4" />
                                        Interface Language
                                    </label>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Choose the language for the user interface
                                    </p>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="spanish">Spanish</SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="german">German</SelectItem>
                                            <SelectItem value="chinese">Chinese</SelectItem>
                                            <SelectItem value="japanese">Japanese</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Reading Experience</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label htmlFor="single-page" className="font-medium">Single Page View</label>
                                            <p className="text-sm text-muted-foreground">
                                                Show one page at a time in reader mode
                                            </p>
                                        </div>
                                        <Switch
                                            id="single-page"
                                            checked={true}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label htmlFor="auto-bookmark" className="font-medium">Auto Bookmarks</label>
                                            <p className="text-sm text-muted-foreground">
                                                Remember where you left off reading
                                            </p>
                                        </div>
                                        <Switch
                                            id="auto-bookmark"
                                            checked={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Button className="w-full" onClick={() => toast.success("Settings saved")}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save General Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Notification Methods</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="email-notifications" className="font-medium">Email Notifications</label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive updates and reminders via email
                                    </p>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={emailNotifications}
                                    onCheckedChange={setEmailNotifications}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="push-notifications" className="font-medium">Push Notifications</label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive alerts on your device
                                    </p>
                                </div>
                                <Switch
                                    id="push-notifications"
                                    checked={pushNotifications}
                                    onCheckedChange={setPushNotifications}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Notification Types</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="loan-reminders" className="font-medium">Loan Reminders</label>
                                    <p className="text-sm text-muted-foreground">
                                        Reminders for due dates and expiring loans
                                    </p>
                                </div>
                                <Switch
                                    id="loan-reminders"
                                    checked={loanReminders}
                                    onCheckedChange={setLoanReminders}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="new-arrivals" className="font-medium">New Arrivals</label>
                                    <p className="text-sm text-muted-foreground">
                                        Alerts when new books are added in your interests
                                    </p>
                                </div>
                                <Switch
                                    id="new-arrivals"
                                    checked={newArrivals}
                                    onCheckedChange={setNewArrivals}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="author-updates" className="font-medium">Author Updates</label>
                                    <p className="text-sm text-muted-foreground">
                                        Updates about your favorite authors
                                    </p>
                                </div>
                                <Switch
                                    id="author-updates"
                                    checked={authorUpdates}
                                    onCheckedChange={setAuthorUpdates}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="system-announcements" className="font-medium">System Announcements</label>
                                    <p className="text-sm text-muted-foreground">
                                        Important announcements about the library
                                    </p>
                                </div>
                                <Switch
                                    id="system-announcements"
                                    checked={systemAnnouncements}
                                    onCheckedChange={setSystemAnnouncements}
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full md:w-auto" onClick={() => toast.success("Notification settings saved")}>
                        <Bell className="mr-2 h-4 w-4" />
                        Save Notification Settings
                    </Button>
                </TabsContent>

                {/* Privacy Settings */}
                <TabsContent value="privacy" className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Privacy Controls</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="share-history" className="font-medium">Share Reading History</label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow the library to use your reading history for recommendations
                                    </p>
                                </div>
                                <Switch
                                    id="share-history"
                                    checked={shareReadingHistory}
                                    onCheckedChange={setShareReadingHistory}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="show-profile" className="font-medium">Public Profile</label>
                                    <p className="text-sm text-muted-foreground">
                                        Make your profile visible to other library users
                                    </p>
                                </div>
                                <Switch
                                    id="show-profile"
                                    checked={showProfileToOthers}
                                    onCheckedChange={setShowProfileToOthers}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="allow-recommendations" className="font-medium">Personalized Recommendations</label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive book recommendations based on your interests
                                    </p>
                                </div>
                                <Switch
                                    id="allow-recommendations"
                                    checked={allowRecommendations}
                                    onCheckedChange={setAllowRecommendations}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Data Management</h2>

                        <div className="space-y-4">
                            <Button variant="outline" onClick={() => toast.success("Data export requested. You'll receive a download link soon.")}>
                                Export Your Data
                            </Button>

                            <Button variant="outline" className="text-destructive" onClick={() => toast.error("This action requires confirmation via email")}>
                                Delete Reading History
                            </Button>
                        </div>
                    </div>

                    <Button className="w-full md:w-auto" onClick={() => toast.success("Privacy settings saved")}>
                        <Shield className="mr-2 h-4 w-4" />
                        Save Privacy Settings
                    </Button>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Account Security</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <Switch
                                    id="two-factor"
                                    checked={twoFactorAuth}
                                    onCheckedChange={setTwoFactorAuth}
                                />
                            </div>

                            {twoFactorAuth && (
                                <div className="bg-muted/50 p-4 rounded">
                                    <p className="text-sm mb-2">
                                        Two-factor authentication is now enabled. You'll need to verify your identity with a code sent to your email when signing in from new devices.
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Configure 2FA Options
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

                        <form onSubmit={handleSavePassword} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="current-password" className="block font-medium">Current Password</label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="new-password" className="block font-medium">New Password</label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirm-password" className="block font-medium">Confirm New Password</label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full md:w-auto">
                                <Lock className="mr-2 h-4 w-4" />
                                Update Password
                            </Button>
                        </form>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Session Management</h2>

                        <div className="space-y-4">
                            <Button variant="outline" onClick={() => toast.success("All other devices have been logged out")}>
                                Sign Out from All Devices
                            </Button>

                            <div className="p-4 border rounded-md">
                                <h3 className="font-medium mb-2">Recent Login Activity</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Current Session</span>
                                        <span className="text-muted-foreground">Just now</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Mobile App Login</span>
                                        <span className="text-muted-foreground">Yesterday</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Web Browser Login</span>
                                        <span className="text-muted-foreground">3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}