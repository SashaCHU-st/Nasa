import { describe, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Profile Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("Checking if user put inputs", async() => {
    render(<Profile />);
    fireEvent.change(screen.getByLabelText(/Name \(max 28 characters\)/i), {
      target: { value: "Kuku" },
    });
    await waitFor(() => expect(screen.getByRole("button", { name: /Update/i })).not.toBeDisabled());
    
    // Fire click event on update button
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));
    await waitFor(() => screen.getByText(/Profile updated successfully!/i));
    expect(screen.getByText(/Profile updated successfully!/i)).toBeInTheDocument();
  });
});
