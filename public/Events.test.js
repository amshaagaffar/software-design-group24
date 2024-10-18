const userprofile = require("./Events");

describe("Event Management Form", () => {
  test("Event Name input should be required and have a max length of 100 characters", () => {
    const eventNameInput = document.querySelector(
      'input[aria-label="Event Name"]'
    );
    expect(eventNameInput).toBeRequired();
    fireEvent.input(eventNameInput, { target: { value: "A".repeat(101) } });
    expect(eventNameInput.value.length).toBe(100);
  });

  test("Event Description textarea should be required", () => {
    const eventDescriptionTextarea = document.querySelector(
      'textarea[aria-label="Event Description"]'
    );
    expect(eventDescriptionTextarea).toBeRequired();
    fireEvent.input(eventDescriptionTextarea, {
      target: { value: "Sample Event Description" },
    });
    expect(eventDescriptionTextarea.value).toBe("Sample Event Description");
  });

  test("Location textarea should be required", () => {
    const locationTextarea = document.querySelector(
      'textarea[aria-label="Location"]'
    );
    expect(locationTextarea).toBeRequired();
    fireEvent.input(locationTextarea, { target: { value: "Sample Location" } });
    expect(locationTextarea.value).toBe("Sample Location");
  });

  test("Required Skills select should allow multiple selections and be required", () => {
    const requiredSkillsSelect = document.querySelector(
      'select[aria-label="Required Skills"]'
    );
    expect(requiredSkillsSelect).toBeRequired();
    expect(requiredSkillsSelect.multiple).toBeTruthy();

    // Simulate selecting two skills
    fireEvent.change(requiredSkillsSelect, {
      target: { value: ["Programming", "Design"] },
    });
    expect(requiredSkillsSelect.selectedOptions.length).toBe(2);
  });

  test("Urgency select should be required and should not allow the first option to be selected", () => {
    const urgencySelect = document.querySelector(
      'select[aria-label="Urgency"]'
    );
    expect(urgencySelect).toBeRequired();

    const firstOption = urgencySelect.querySelector("option");
    expect(firstOption.textContent).toBe("Select Urgency");

    fireEvent.change(urgencySelect, { target: { value: "High" } });
    expect(urgencySelect.value).toBe("High");
  });

  test("Event Date input should be required and in date format", () => {
    const eventDateInput = document.querySelector(
      'input[aria-label="Event Date"]'
    );
    expect(eventDateInput).toBeRequired();

    // Simulate input of a valid date
    fireEvent.input(eventDateInput, { target: { value: "2024-10-18" } });
    expect(eventDateInput.value).toBe("2024-10-18");
  });

  test("Form should not submit if required fields are missing", () => {
    const form = document.querySelector("form");
    fireEvent.submit(form);

    // The form should not be valid without all required fields filled
    expect(form.checkValidity()).toBeFalsy();
  });

  test("Form should submit if all required fields are filled", () => {
    const form = document.querySelector("form");
    const eventNameInput = document.querySelector(
      'input[aria-label="Event Name"]'
    );
    const eventDescriptionTextarea = document.querySelector(
      'textarea[aria-label="Event Description"]'
    );
    const locationTextarea = document.querySelector(
      'textarea[aria-label="Location"]'
    );
    const urgencySelect = document.querySelector(
      'select[aria-label="Urgency"]'
    );
    const eventDateInput = document.querySelector(
      'input[aria-label="Event Date"]'
    );

    fireEvent.input(eventNameInput, { target: { value: "Sample Event" } });
    fireEvent.input(eventDescriptionTextarea, {
      target: { value: "Sample Event Description" },
    });
    fireEvent.input(locationTextarea, { target: { value: "Sample Location" } });
    fireEvent.change(urgencySelect, { target: { value: "High" } });
    fireEvent.input(eventDateInput, { target: { value: "2024-10-18" } });

    fireEvent.submit(form);
    expect(form.checkValidity()).toBeTruthy();
  });
});
