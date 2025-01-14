import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaClipboard,
    FaUsers,
    FaMoneyBillWave,
    FaInfoCircle,
    FaCalendarAlt,
} from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const MyBookings = () => {
    const { userId, isUserLoggedIn } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null); // State for modal
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false); // Loading state for cancel action

    useEffect(() => {
        const fetchBookings = async () => {
            if (!isUserLoggedIn) {
                setError("Please log in to view your bookings.");
                setLoading(false);
                return;
            }

            if (!userId) {
                setError("User ID is not available.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${userId}`);
                setBookings(response.data.bookings || []);
            } catch (error) {
                setError("Failed to fetch bookings. Please try again later.");
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userId, isUserLoggedIn]);

    const handleCancelBooking = async (bookingId) => {
        try {
            setModalLoading(true);
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`);
            setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            setSelectedBooking(null);
            toast.success("Booking canceled successfully!");
        } catch (error) {
            console.error("Error canceling booking:", error);
            toast.error("Failed to cancel booking. Please try again.");
        } finally {
            setModalLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-3xl font-bold mb-6 text-[#001337] text-center">My Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                            onClick={() => setSelectedBooking(booking)}
                        >
                            <h2 className="text-xl font-semibold text-[#001337] mb-4">
                                {booking.packageTitle}
                            </h2>
                            <p className="flex items-center text-gray-700 mb-2">
                                <FaClipboard className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Package:</strong> {booking.package.title}
                            </p>
                            <p className="flex items-center text-gray-700 mb-2">
                                <FaCalendarAlt className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Date:</strong> {new Date(booking.selectedDate).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-red-500 font-bold text-lg"
                            onClick={() => setSelectedBooking(null)}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-semibold text-[#001337] mb-4">
                            {selectedBooking.packageTitle}
                        </h2>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaClipboard className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Package:</strong> {selectedBooking.package.title}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaEnvelope className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Email:</strong> {selectedBooking.email}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaPhoneAlt className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Phone:</strong> {selectedBooking.phone}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaUsers className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Travelers:</strong> {selectedBooking.travelers}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaInfoCircle className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Special Requests:</strong> {selectedBooking.specialRequests || "None"}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                            <FaMoneyBillWave className="h-5 w-5 mr-2 text-[#001337]" />
                            <strong>Total Price:</strong> ₹{selectedBooking.totalPrice}
                        </p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleCancelBooking(selectedBooking._id)}
                            disabled={modalLoading}
                        >
                            {modalLoading ? "Canceling..." : "Cancel Booking"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
