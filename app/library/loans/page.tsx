
import { useEffect, useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { BookIcon, Calendar, Clock, LogIn } from "lucide-react";
import { format, isBefore, addDays } from "date-fns";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { getBooks } from "@/app/services/bookService";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

// Mock loan data
interface Loan {
    id: string;
    bookId: string;
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    extended: boolean;
}

// Mock reservation data
interface Reservation {
    id: string;
    bookId: string;
    reservationDate: string;
    availableDate?: string;
    status: "waiting" | "available" | "expired" | "borrowed";
}

const mockLoans: Loan[] = [
    {
        id: "loan1",
        bookId: "1",
        borrowDate: format(addDays(new Date(), -10), 'yyyy-MM-dd'),
        dueDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
        extended: false
    },
    {
        id: "loan2",
        bookId: "3",
        borrowDate: format(addDays(new Date(), -20), 'yyyy-MM-dd'),
        dueDate: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
        returnDate: format(addDays(new Date(), -7), 'yyyy-MM-dd'),
        extended: true
    },
    {
        id: "loan3",
        bookId: "6",
        borrowDate: format(addDays(new Date(), -15), 'yyyy-MM-dd'),
        dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        extended: true
    }
];

const mockReservations: Reservation[] = [
    {
        id: "res1",
        bookId: "5", // Educated (unavailable book)
        reservationDate: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
        status: "waiting"
    },
    {
        id: "res2",
        bookId: "8", // Becoming (unavailable book)
        reservationDate: format(addDays(new Date(), -3), 'yyyy-MM-dd'),
        availableDate: format(addDays(new Date(), -1), 'yyyy-MM-dd'),
        status: "available"
    }
];

export default function LoansPage() {
    //   const { isAuthenticated } = useAuth();
    const [books, setBooks] = useState<any[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("current");

    useEffect(() => {
        const loadData = async () => {

            try {
                setIsLoading(true);
                const booksData = await getBooks();
                setBooks(booksData);

                // In a real app, these would come from an API
                setLoans(mockLoans);
                setReservations(mockReservations);
            } catch (error) {
                console.error('Error loading loans data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const getBookById = (id: string) => {
        return books.find(book => book.id === id);
    };

    const handleExtendLoan = (loanId: string) => {
        // In a real app, this would call an API
        setLoans(loans.map(loan => {
            if (loan.id === loanId) {
                const newDueDate = addDays(new Date(loan.dueDate), 14);
                toast.success(`Loan extended. New due date: ${format(newDueDate, 'MMMM d, yyyy')}`);
                return {
                    ...loan,
                    dueDate: format(newDueDate, 'yyyy-MM-dd'),
                    extended: true
                };
            }
            return loan;
        }));
    };

    const handleReturnBook = (loanId: string) => {
        // In a real app, this would call an API
        setLoans(loans.map(loan => {
            if (loan.id === loanId) {
                toast.success(`Book returned successfully`);
                return {
                    ...loan,
                    returnDate: format(new Date(), 'yyyy-MM-dd')
                };
            }
            return loan;
        }));
    };

    const handleCancelReservation = (reservationId: string) => {
        // In a real app, this would call an API
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        toast.success("Reservation cancelled successfully");
    };

    const handleBorrowReserved = (reservationId: string) => {
        // In a real app, this would call an API to convert reservation to loan
        const reservation = reservations.find(r => r.id === reservationId);

        if (reservation) {
            // Add a new loan
            const newLoan: Loan = {
                id: `loan-${Date.now()}`,
                bookId: reservation.bookId,
                borrowDate: format(new Date(), 'yyyy-MM-dd'),
                dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
                extended: false
            };

            setLoans([...loans, newLoan]);

            // Remove the reservation
            setReservations(reservations.filter(r => r.id !== reservationId));

            toast.success("Book borrowed successfully");
        }
    };

    // Current loans (not returned)
    const currentLoans = loans.filter(loan => !loan.returnDate);

    // Returned loans
    const loanHistory = loans.filter(loan => loan.returnDate);

    // Overdue loans
    const overdueLoans = currentLoans.filter(loan =>
        isBefore(new Date(loan.dueDate), new Date())
    );

    // If user is not authenticated, show a login prompt
    //   if (!isAuthenticated) {
    //     return (
    //       <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
    //         <BookIcon className="h-16 w-16 text-muted-foreground mb-4" />
    //         <h1 className="text-2xl font-bold mb-2">Your Loans & Reservations</h1>
    //         <p className="text-muted-foreground mb-6">
    //           Sign in to manage your book loans and reservations. Track due dates, extend loans, and see your reservation status.
    //         </p>
    //         <Button asChild>
    //           <Link to="/profile">
    //             <LogIn className="mr-2 h-4 w-4" />
    //             Sign in to continue
    //           </Link>
    //         </Button>
    //       </div>
    //     );
    //   }

    return (
        <div className="container py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Your Loans & Reservations</h1>
                <p className="text-muted-foreground">
                    Manage your borrowed books and reservations. Keep track of due dates and extend your loans if needed.
                </p>
            </header>

            {isLoading ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">Loading your loans and reservations...</p>
                </div>
            ) : (
                <Tabs defaultValue="current" onValueChange={setActiveTab}>
                    <TabsList className="mb-8">
                        <TabsTrigger value="current">
                            Current Loans {currentLoans.length > 0 && `(${currentLoans.length})`}
                        </TabsTrigger>
                        <TabsTrigger value="overdue">
                            Overdue {overdueLoans.length > 0 && `(${overdueLoans.length})`}
                        </TabsTrigger>
                        <TabsTrigger value="reservations">
                            Reservations {reservations.length > 0 && `(${reservations.length})`}
                        </TabsTrigger>
                        <TabsTrigger value="history">
                            Loan History {loanHistory.length > 0 && `(${loanHistory.length})`}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="current">
                        {currentLoans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentLoans.map(loan => {
                                    const book = getBookById(loan.bookId);
                                    if (!book) return null;

                                    const isNearlyDue = isBefore(
                                        new Date(loan.dueDate),
                                        addDays(new Date(), 3)
                                    ) && !isBefore(new Date(loan.dueDate), new Date());

                                    return (
                                        <div key={loan.id} className="border rounded-lg overflow-hidden">
                                            <div className="p-4 border-b bg-card">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium mb-1">{book.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                                    </div>
                                                    {isNearlyDue && (
                                                        <div className="bg-warning/20 text-warning px-2 py-1 rounded text-xs font-medium">
                                                            Due soon
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center text-sm mb-3">
                                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        Borrowed: {format(new Date(loan.borrowDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center text-sm mb-5">
                                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span className={isNearlyDue ? "text-warning font-medium" : ""}>
                                                        Due: {format(new Date(loan.dueDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleReturnBook(loan.id)}
                                                        className="flex-1"
                                                    >
                                                        Return Book
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleExtendLoan(loan.id)}
                                                        disabled={loan.extended}
                                                        className="flex-1"
                                                    >
                                                        {loan.extended ? "Already Extended" : "Extend Loan"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-xl font-semibold mb-2">No current loans</h2>
                                <p className="text-muted-foreground mb-6">
                                    You don't have any books borrowed at the moment.
                                </p>
                                <Button asChild>
                                    <Link href="/">Browse Books</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="overdue">
                        {overdueLoans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {overdueLoans.map(loan => {
                                    const book = getBookById(loan.bookId);
                                    if (!book) return null;

                                    return (
                                        <div key={loan.id} className="border rounded-lg overflow-hidden border-destructive/50">
                                            <div className="p-4 border-b bg-destructive/10">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium mb-1">{book.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                                    </div>
                                                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
                                                        Overdue
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center text-sm mb-3">
                                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        Borrowed: {format(new Date(loan.borrowDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center text-sm mb-5">
                                                    <Clock className="h-4 w-4 mr-2 text-destructive" />
                                                    <span className="text-destructive font-medium">
                                                        Was due: {format(new Date(loan.dueDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <Button
                                                    onClick={() => handleReturnBook(loan.id)}
                                                    className="w-full"
                                                    variant="destructive"
                                                >
                                                    Return Overdue Book
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="bg-success/20 text-success px-4 py-3 rounded-md mb-6 max-w-md mx-auto">
                                    <p className="font-medium">Good job!</p>
                                    <p className="text-sm">You don't have any overdue books.</p>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="reservations">
                        {reservations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reservations.map(reservation => {
                                    const book = getBookById(reservation.bookId);
                                    if (!book) return null;

                                    return (
                                        <div key={reservation.id} className="border rounded-lg overflow-hidden">
                                            <div className="p-4 border-b bg-card">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium mb-1">{book.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                                    </div>
                                                    <div className={`px-2 py-1 rounded text-xs font-medium ${reservation.status === 'available'
                                                            ? 'bg-success text-success-foreground'
                                                            : 'bg-muted text-muted-foreground'
                                                        }`}>
                                                        {reservation.status === 'available' ? 'Available now' : 'Waiting'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center text-sm mb-3">
                                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        Reserved: {format(new Date(reservation.reservationDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                {reservation.availableDate && (
                                                    <div className="flex items-center text-sm mb-3">
                                                        <Clock className="h-4 w-4 mr-2 text-success" />
                                                        <span className="text-success font-medium">
                                                            Available since: {format(new Date(reservation.availableDate), 'MMMM d, yyyy')}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex gap-2 mt-4">
                                                    {reservation.status === 'available' ? (
                                                        <Button
                                                            onClick={() => handleBorrowReserved(reservation.id)}
                                                            className="flex-1"
                                                        >
                                                            Borrow Now
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            disabled
                                                            className="flex-1"
                                                        >
                                                            Waiting for Availability
                                                        </Button>
                                                    )}

                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleCancelReservation(reservation.id)}
                                                        className="flex-1"
                                                    >
                                                        Cancel Reservation
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-xl font-semibold mb-2">No reservations</h2>
                                <p className="text-muted-foreground mb-6">
                                    You don't have any reserved books at the moment.
                                </p>
                                <Button asChild>
                                    <Link href="/search">Find Books</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="history">
                        {loanHistory.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loanHistory.map(loan => {
                                    const book = getBookById(loan.bookId);
                                    if (!book) return null;

                                    return (
                                        <div key={loan.id} className="border rounded-lg overflow-hidden bg-muted/30">
                                            <div className="p-4 border-b">
                                                <h3 className="font-medium mb-1">{book.title}</h3>
                                                <p className="text-sm text-muted-foreground">{book.author}</p>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center text-sm mb-3">
                                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        Borrowed: {format(new Date(loan.borrowDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center text-sm mb-3">
                                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        Due: {format(new Date(loan.dueDate), 'MMMM d, yyyy')}
                                                    </span>
                                                </div>

                                                {loan.returnDate && (
                                                    <div className="flex items-center text-sm">
                                                        <BookIcon className="h-4 w-4 mr-2 text-success" />
                                                        <span className="text-success font-medium">
                                                            Returned: {format(new Date(loan.returnDate), 'MMMM d, yyyy')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-xl font-semibold mb-2">No loan history yet</h2>
                                <p className="text-muted-foreground mb-6">
                                    You haven't borrowed any books yet.
                                </p>
                                <Button asChild>
                                    <Link href="/">Browse Books</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}