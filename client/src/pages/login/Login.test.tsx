import { describe, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../components/context/auth-context";
import Auth from "../login/Login";


global.fetch = vi.fn();// mock api it is not fetch in rel when testung, but checkin
//how function was called
describe("Login Component", () => {
  let mockLogin: () => void;

  beforeEach(() => {
    mockLogin = vi.fn();// mocking login function with = vi.fn()
    vi.resetAllMocks();// ensures that all tests are isolated
  });

  const renderComponent = () =>
    render(
      <AuthContext.Provider
        value={{
          userId: "123", // Mock user ID
          token: "mockToken", // Mock token
          isLoggedIn: false, // Initially not logged in
          login: mockLogin, // Mock login function
          logout: vi.fn(), // Mock logout function
        }}
      >
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  

  it("checking login form at the begining", () => {
    renderComponent();/// taking values from custom fucntion with login and logi form
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
  });

  it("switches to signup mode; Your name need to appear ", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/SWITCH TO SIGNUP/i));
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
  });

  it("submits login form successfully", async () => {
    renderComponent();
  
    vi.spyOn(global, "fetch").mockImplementationOnce(() =>/// mocking fun globaly, ensure it implements once
      Promise.resolve({// miock implemet returs a Promise that rsponse with succsesull
        ok: true,// all good status 200
        json: () =>/// retrun  a promise that return with mock data userId and token
          Promise.resolve({
            userId: "123",
            token: "mockToken",
          }),
      } as Response)
    );
  
    fireEvent.change(screen.getByLabelText(/E-Mail/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
  
    fireEvent.click(screen.getByText(/LOGIN/i));
  
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("123", "mockToken"));
    //wait for async action to complete. Wayring MockLogin is called with corect argumnetsand submited to mockAPI responds
  });
  

  it("Wrong credenital;Logging in failed, wrong credentials.", async () => {
    renderComponent(); // Render the Auth component
    
    // Mock a failed login response
    vi.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({ message: "Logging in failed, wrong credentials." }),
      } as Response)
    );
  
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: "wrong@test.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByText(/LOGIN/i));
    await waitFor(() => screen.getByText(/Logging in failed, wrong credentials/i));
  });
});
