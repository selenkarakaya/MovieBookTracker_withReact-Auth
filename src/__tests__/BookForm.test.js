import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookForm from "../components/BookForm"; // Adjust path as needed
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

// Mock Firebase Firestore functions
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn().mockResolvedValueOnce({ id: "1" }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
}));

// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "12345" },
  })),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

test("renders BookForm correctly", () => {
  render(<BookForm fetchBooks={() => {}} bookEdit={{ edit: false }} />);
  //Check for the form elements
  expect(screen.queryByPlaceholderText("title of movie"));
  expect(screen.queryByPlaceholderText("date"));
  expect(screen.queryByPlaceholderText("add comment!!"));
  expect(screen.queryByPlaceholderText("Add Your Books"));
});
describe("BookForm", () => {
  it("submits the form with valid data", async () => {
    const fetchBooks = jest.fn();

    // Mock the getFirestore function to return a mock database instance
    const mockDb = {};
    getFirestore.mockReturnValue(mockDb);

    // Mock collection to return a mock collection reference
    collection.mockReturnValue({});

    // Render the component
    render(<BookForm bookEdit={{ edit: false }} fetchBooks={fetchBooks} />);
    // Ensure the element is found
    fireEvent.click(screen.getByText("Add Your Books"));
    // // If the form is rendered, the next line will run

    // Wait for the form to appear by checking for a form element or placeholder
    await waitFor(() => screen.getByPlaceholderText("title of movie"));

    // Wait for the form to appear
    const titleInput = screen.getByPlaceholderText("title of movie");
    const dateInput = screen.getByPlaceholderText("date");
    const commentInput = screen.getByPlaceholderText("add comment!!");

    // Fill in the form fields
    fireEvent.change(titleInput, { target: { value: "My New Book" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-01" } });
    fireEvent.change(commentInput, { target: { value: "Great book!" } });

    // Mock the addDoc function to resolve with a dummy object
    addDoc.mockResolvedValue({ id: "1234" });

    // Submit the form
    fireEvent.click(screen.getByText("Add book"));

    expect(screen.queryByPlaceholderText("title of movie").value).toBe(
      "My New Book"
    );

    expect(screen.findByText("My New Book was added successfully 🥳!")); // Adjust based on your success message
  });
});
