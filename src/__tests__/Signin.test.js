import { render, screen, fireEvent, act } from "@testing-library/react";
import SignIn from "../components/SignIn";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// Mock Firebase Authentication
jest.mock("firebase/auth", () => {
  // Mock authentication structure
  const authMock = {
    currentUser: { uid: "test-user", email: "test@example.com" }, // mock currentUser to avoid undefined errors
  };
  return {
    getAuth: jest.fn(() => authMock), // mock getAuth to return authMock
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: "test-user", email: "test@example.com" } })
    ),
  };
});

describe("Firebase Login", () => {
  test("calls signInWithEmailAndPassword on login", async () => {
    const authMock = getAuth();
    await act(async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </MemoryRouter>
      );
    });

    // Test for the presence of email input and password input
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Verify the Firebase method was called
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      authMock, // Ensure authMock is passed as the first argument
      "test@example.com",
      "password123"
    );
  });
});
