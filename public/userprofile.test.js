const userprofile = require("./userprofile");
``;
describe("User Profile Form", () => {
  test("Full Name field should be required", () => {
    const fullNameInput = document.getElementById("fullName");
    expect(fullNameInput).toBeRequired();
  });

  test('State dropdown should have a "Select a state" option', () => {
    const stateSelect = document.getElementById("state");
    const firstOption = stateSelect.querySelector("option");
    expect(firstOption).toHaveTextContent("Select a state");
  });

  test("Zip code field should accept a valid 5-digit zip code", () => {
    const zipcodeInput = document.getElementById("zipcode");
    fireEvent.input(zipcodeInput, { target: { value: "12345" } });
    expect(zipcodeInput.value).toBe("12345");
    expect(zipcodeInput.checkValidity()).toBeTruthy();
  });

  test("Zip code field should not accept invalid input", () => {
    const zipcodeInput = document.getElementById("zipcode");
    fireEvent.input(zipcodeInput, { target: { value: "123" } });
    expect(zipcodeInput.value).toBe("123");
    expect(zipcodeInput.checkValidity()).toBeFalsy();
  });

  test("Skills field should be a required multiple select", () => {
    const skillsSelect = document.getElementById("skills");
    expect(skillsSelect).toBeRequired();
    expect(skillsSelect.multiple).toBeTruthy();
  });

  test("Form should not submit when required fields are empty", () => {
    const form = document.querySelector("form");
    const submitButton = document.querySelector('input[type="submit"]');

    fireEvent.submit(form);

    // Expect the form to not be submitted because required fields are empty
    expect(form.checkValidity()).toBeFalsy();
  });

  test("Full Name field should respect maxLength of 50", () => {
    const fullNameInput = document.getElementById("fullName");
    fireEvent.input(fullNameInput, { target: { value: "a".repeat(51) } });
    expect(fullNameInput.value.length).toBe(50);
  });

  test("Address1 field should be required", () => {
    const address1Input = document.getElementById("address1");
    expect(address1Input).toBeRequired();
  });

  test("Submit button should exist", () => {
    const submitButton = document.querySelector('input[type="submit"]');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveValue("Save Profile");
  });
});
