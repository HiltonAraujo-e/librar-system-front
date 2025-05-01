"use client"
import { useState } from "react";
import { HelpCircle, MessageCircle, Search, Book, BookOpen, Heart, Calendar, User, Settings, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// FAQ categories and questions
const faqs = [
    {
        category: "Borrowing Books",
        questions: [
            {
                id: "borrow-1",
                question: "How do I borrow a book?",
                answer: "To borrow a book, find the book you want in our catalog and click the 'Borrow' button on the book card or book details page. You need to be logged in to borrow books. The book will be added to your library and will be available for the standard loan period."
            },
            {
                id: "borrow-2",
                question: "How long can I borrow a book for?",
                answer: "The standard loan period is 14 days. You can extend your loan once for an additional 14 days if no one else has reserved the book."
            },
            {
                id: "borrow-3",
                question: "How many books can I borrow at once?",
                answer: "You can borrow up to 5 books at the same time with a standard account."
            },
            {
                id: "borrow-4",
                question: "What happens if I don't return a book on time?",
                answer: "If you don't return a book by the due date, it will be marked as overdue. Overdue books may affect your ability to borrow additional books until you return them."
            }
        ]
    },
    {
        category: "Reservations",
        questions: [
            {
                id: "reserve-1",
                question: "How do I reserve a book that's currently unavailable?",
                answer: "If a book is currently unavailable, you'll see a 'Reserve' button instead of 'Borrow'. Click this button to place a reservation. You'll be notified when the book becomes available for you to borrow."
            },
            {
                id: "reserve-2",
                question: "How long will my reservation be held?",
                answer: "When a reserved book becomes available, it will be held for you for 3 days. If you don't borrow it within that time, the reservation will expire and the book will be offered to the next person in the reservation queue or return to general availability."
            },
            {
                id: "reserve-3",
                question: "How many books can I reserve at once?",
                answer: "You can have up to 3 active reservations at a time."
            }
        ]
    },
    {
        category: "Account Management",
        questions: [
            {
                id: "account-1",
                question: "How do I create an account?",
                answer: "To create an account, click on the 'Login / Sign Up' button in the sidebar and follow the instructions to register. You'll need to provide a valid email address and create a password."
            },
            {
                id: "account-2",
                question: "How do I change my password or update my profile?",
                answer: "You can update your profile information and change your password in the Profile section. Go to your Profile page by clicking on your avatar or the Profile option in the sidebar."
            },
            {
                id: "account-3",
                question: "What are the benefits of having an account?",
                answer: "Having an account allows you to borrow books, create favorites lists, track your reading history, receive personalized recommendations, and participate in the community by rating and reviewing books."
            }
        ]
    },
    {
        category: "Features & Navigation",
        questions: [
            {
                id: "feature-1",
                question: "How do I search for books?",
                answer: "You can search for books using the search bar at the top of the page. You can search by title, author, or ISBN. You can also browse books by category using the sidebar navigation."
            },
            {
                id: "feature-2",
                question: "How do I add books to my favorites?",
                answer: "To add a book to your favorites, click the heart icon on any book card or on the book details page. You can view all your favorites in the 'Favorites' section accessible from the sidebar."
            },
            {
                id: "feature-3",
                question: "How do I track my reading history?",
                answer: "Your reading history is automatically tracked as you borrow and return books. You can view your reading history in the 'Reading History' section accessible from the sidebar."
            },
            {
                id: "feature-4",
                question: "How do I rate and review books?",
                answer: "You can rate and review books on the book details page. Scroll down to the reviews section and click 'Write a Review' to share your thoughts and rating."
            }
        ]
    }
];

export default function HelpPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFaqs, setFilteredFaqs] = useState(faqs);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchTerm.trim() === "") {
            setFilteredFaqs(faqs);
            setSelectedCategory(null);
            return;
        }

        const term = searchTerm.toLowerCase();

        // Filter categories and questions that match the search term
        const filtered = faqs.map(category => ({
            ...category,
            questions: category.questions.filter(q =>
                q.question.toLowerCase().includes(term) ||
                q.answer.toLowerCase().includes(term)
            )
        })).filter(category => category.questions.length > 0);

        setFilteredFaqs(filtered);
        setSelectedCategory(null);
    };

    const filterByCategory = (category: string | null) => {
        setSelectedCategory(category);

        if (category === null) {
            setFilteredFaqs(faqs);
            return;
        }

        const filtered = faqs.filter(c => c.category === category);
        setFilteredFaqs(filtered);
    };

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, this would send the form data to an API
        setContactName("");
        setContactEmail("");
        setContactMessage("");
    };

    // Quick links for common help topics
    const quickLinks = [
        { icon: Book, title: "Borrowing Books", category: "Borrowing Books" },
        { icon: Calendar, title: "Reservations", category: "Reservations" },
        { icon: User, title: "Account Help", category: "Account Management" },
        { icon: BookOpen, title: "Using the Library", category: "Features & Navigation" },
        { icon: Heart, title: "Favorites & Lists", category: "Features & Navigation" },
        { icon: Settings, title: "Settings & Preferences", category: "Account Management" },
    ];

    return (
        <div className="container py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <HelpCircle className="h-8 w-8" />
                    Help & Support
                </h1>
                <p className="text-muted-foreground">
                    Find answers to common questions about using our digital library. Can't find what you're looking for? Contact us directly.
                </p>
            </header>

            {/* Search bar */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="relative">
                    <Input
                        placeholder="Search for help topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        Search
                    </Button>
                </form>
            </div>

            {/* Quick links */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {quickLinks.map((link, index) => (
                        <Card
                            key={index}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => filterByCategory(link.category)}
                        >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <link.icon className="h-8 w-8 text-primary mb-2" />
                                <span className="text-sm font-medium">{link.title}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FAQ section */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                        {selectedCategory && (
                            <Button variant="ghost" size="sm" onClick={() => filterByCategory(null)}>
                                Clear filter
                            </Button>
                        )}
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {faqs.map(category => (
                            <Button
                                key={category.category}
                                variant={selectedCategory === category.category ? "default" : "outline"}
                                size="sm"
                                onClick={() => filterByCategory(category.category)}
                            >
                                {category.category}
                            </Button>
                        ))}
                    </div>

                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map(category => (
                            <div key={category.category} className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {category.questions.map(faq => (
                                        <AccordionItem key={faq.id} value={faq.id}>
                                            <AccordionTrigger className="text-left">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No results found</h3>
                            <p className="text-muted-foreground">
                                We couldn't find any FAQs matching your search. Try different keywords or contact us directly.
                            </p>
                        </div>
                    )}
                </div>

                {/* Contact form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Contact Support
                            </CardTitle>
                            <CardDescription>
                                Can't find what you're looking for? Send us a message and we'll get back to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your email address"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full min-h-[120px] p-3 border rounded-md bg-transparent"
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Additional help resources */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-primary hover:underline flex items-center">
                                    <ChevronDown className="h-4 w-4 mr-2 rotate-[-90deg]" />
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-primary hover:underline flex items-center">
                                    <ChevronDown className="h-4 w-4 mr-2 rotate-[-90deg]" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessibility" className="text-primary hover:underline flex items-center">
                                    <ChevronDown className="h-4 w-4 mr-2 rotate-[-90deg]" />
                                    Accessibility Statement
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@bookworm.com"
                                    className="text-primary hover:underline flex items-center"
                                >
                                    <ChevronDown className="h-4 w-4 mr-2 rotate-[-90deg]" />
                                    Email Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
