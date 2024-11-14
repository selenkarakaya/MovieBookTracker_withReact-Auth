import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookForm from "../components/BookForm";
import { toast } from "react-toastify";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import RatingReview from "../components/RatingReview";

// Mock Firebase functions

// jest.mock("firebase/firestore", () => ({
//   getFirestore: jest.fn(() => ({
//     collection: jest.fn(),
//     doc: jest.fn(),
//     getDoc: jest.fn(),
//     setDoc: jest.fn(),
//     updateDoc: jest.fn(),
//   })),
// }));

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  addDoc: jest.fn(), // Mock addDoc
  collection: jest.fn(), // Mock collection if needed
}));

// Mock Firebase authentication
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "test-user-id" },
  })),
}));

// Mock Toastify
jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

// Mock RatingReview component
jest.mock("../components/RatingReview", () => ({
  __esModule: true,
  default: ({ select }) => {
    return <div onClick={() => select("5")}>Rating</div>;
  },
}));

test("renders BookForm correctly", () => {
  render(<BookForm fetchBooks={() => {}} bookEdit={{ edit: false }} />);
  // Check for the form elements
  expect(screen.queryByPlaceholderText("title of movie"));
  expect(screen.queryByPlaceholderText("date"));
  expect(screen.queryByPlaceholderText("add comment!!"));
  expect(screen.queryByPlaceholderText("Add Your Books"));
});
