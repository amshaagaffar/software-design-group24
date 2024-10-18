describe("Login Form Tests", () => {
  beforeEach(() => {
    // Clear mocks before each test
    fetch.mockClear();
    localStorage.clear();
  });

  test("Email input should be required and in email format", () => {
    const emailInput = document.getElementById("email");
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute("type", "email");

    // Test invalid email format
    fireEvent.input(emailInput, { target: { value: "invalid-email" } });
    expect(emailInput.checkValidity()).toBeFalsy();

    // Test valid email format
    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.checkValidity()).toBeTruthy();
  });

  test("Password input should be required", () => {
    const passwordInput = document.getElementById("password");
    expect(passwordInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("Form should call the login API on submit with valid inputs", async () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Provide valid inputs
    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "password123" } });

    // Mock the form submission
    fireEvent.submit(form);

    expect(fetch).toHaveBeenCalledWith("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    // Simulate API response
    await new Promise((r) => setTimeout(r, 100)); // Simulate async

    // Check that token is stored in localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockToken");
  });

  test("Should redirect user based on role after login", async () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Mock admin role response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "adminToken", role: "admin" }),
    });

    // Provide valid inputs
    fireEvent.input(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "adminPass" } });

    // Mock the form submission
    fireEvent.submit(form);

    await new Promise((r) => setTimeout(r, 100)); // Simulate async

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "adminToken");
    expect(window.location.href).toBe("/admin_dashboard.html");
  });

  test("Should display an error message on failed login", async () => {
    // Mock a failed login response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Invalid credentials" }),
    });

    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Provide invalid inputs
    fireEvent.input(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "wrongPass" } });

    // Mock the form submission
    fireEvent.submit(form);

    // Simulate API response
    await new Promise((r) => setTimeout(r, 100)); // Simulate async

    // Ensure fetch was called and login failed
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("/users/login", expect.any(Object));

    // Since alert is mocked, the error should be logged (for example purposes)
    expect(alert).toHaveBeenCalledWith("Login failed: Invalid credentials");
  });

  test("Should handle network errors gracefully", async () => {
    // Mock a network error
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Provide inputs
    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "password123" } });

    // Mock the form submission
    fireEvent.submit(form);

    // Simulate network error response
    await new Promise((r) => setTimeout(r, 100)); // Simulate async

    // Ensure fetch was called
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check that the error was caught and logged
    expect(console.error).toHaveBeenCalledWith("Error:", expect.any(Error));
  });
});
