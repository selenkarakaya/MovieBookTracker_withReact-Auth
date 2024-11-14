import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../components/SignUp"; // Adjust the path if needed
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

// Mock Firebase methods
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(), // Mock getAuth function
  createUserWithEmailAndPassword: jest.fn(), // Mock createUserWithEmailAndPassword
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: jest.fn(() => <div>Toast Container</div>),
}));

describe("SignUp Component", () => {
  it("shows an error if the sign-up fails", async () => {
    const mockAuth = { currentUser: null }; // Mock auth object
    getAuth.mockReturnValue(mockAuth);
    // Simulate a failed sign-up
    createUserWithEmailAndPassword.mockRejectedValue(
      new Error("Sign-up failed")
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user typing into the form
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Sign Up"));

    // Wait for the asynchronous function to be called and verify the mock call

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth, // Mock auth instance
        "test@example.com", // Email
        "password123" // Password
      );
    });

    // Check if the error toast was triggered

    expect(toast.error).toHaveBeenCalledWith(
      "Something went wrong 😥",
      expect.objectContaining({
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-right",
        theme: "light",
      })
    );
  });
});
