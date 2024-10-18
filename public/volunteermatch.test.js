/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"; // Additional matchers for DOM assertions
import { fireEvent } from "@testing-library/dom";

// Simulate the HTML structure of the volunteer matching form
beforeEach(() => {
  document.body.innerHTML = `
    <h1>Volunteer Matching Form</h1>

    <div class="form-group">
        <label for="volunteerName">Volunteer Name:</label>
        <input type="text" id="volunteerName" placeholder="Loading..." readonly>
    </div>

    <div class="form-group">
        <label for="matchedEvent">Matched Event:</label>
        <input type="text" id="matchedEvent" placeholder="Loading..." readonly>
    </div>

    <button type="button" onclick="matchVolunteer()">Match Volunteer</button>
    
    <script>
      const volunteers = [
          { id: 1, name: "John Doe", skills: "First Aid", availability: "2024-09-30" },
          { id: 2, name: "Jane Smith", skills: "Event Planning", availability: "2024-10-01" }
      ];

      const events = [
          { id: 1, name: "Health Awareness Camp", requirements: "First Aid", date: "2024-09-30" },
          { id: 2, name: "Fundraising Gala", requirements: "Event Planning", date: "2024-10-01" }
      ];

      function matchVolunteer() {
          const volunteer = volunteers[0];  // Assuming auto-fill for "John Doe"
          document.getElementById("volunteerName").value = volunteer.name;

          const matchedEvent = events.find(event => 
              event.requirements === volunteer.skills && event.date === volunteer.availability
          );

          document.getElementById("matchedEvent").value = matchedEvent ? matchedEvent.name : "No match found";
      }
    </script>
  `;
});

describe("Volunteer Matching Form", () => {
  test('Should display "Volunteer Name" and "Matched Event" fields as read-only', () => {
    const volunteerNameInput = document.getElementById("volunteerName");
    const matchedEventInput = document.getElementById("matchedEvent");

    expect(volunteerNameInput).toHaveAttribute("readonly");
    expect(matchedEventInput).toHaveAttribute("readonly");
  });

  test("Should match the first volunteer with the correct event based on skills and availability", () => {
    const matchButton = document.querySelector('button[type="button"]');

    // Simulate clicking the "Match Volunteer" button
    fireEvent.click(matchButton);

    const volunteerNameInput = document.getElementById("volunteerName");
    const matchedEventInput = document.getElementById("matchedEvent");

    // Ensure the volunteer's name and matched event are displayed correctly
    expect(volunteerNameInput.value).toBe("John Doe");
    expect(matchedEventInput.value).toBe("Health Awareness Camp");
  });

  test('Should show "No match found" if no matching event is available', () => {
    // Modify the mock data for testing an unmatched volunteer (one with no matching event)
    const matchButton = document.querySelector('button[type="button"]');

    // Change volunteer's availability to a date that doesn't match any event
    document.body.innerHTML = `
      <h1>Volunteer Matching Form</h1>
      
      <div class="form-group">
          <label for="volunteerName">Volunteer Name:</label>
          <input type="text" id="volunteerName" placeholder="Loading..." readonly>
      </div>

      <div class="form-group">
          <label for="matchedEvent">Matched Event:</label>
          <input type="text" id="matchedEvent" placeholder="Loading..." readonly>
      </div>

      <button type="button" onclick="matchVolunteer()">Match Volunteer</button>
      
      <script>
        const volunteers = [
            { id: 1, name: "John Doe", skills: "First Aid", availability: "2024-11-01" } // No event matches this date
        ];

        const events = [
            { id: 1, name: "Health Awareness Camp", requirements: "First Aid", date: "2024-09-30" },
            { id: 2, name: "Fundraising Gala", requirements: "Event Planning", date: "2024-10-01" }
        ];

        function matchVolunteer() {
            const volunteer = volunteers[0];  // "John Doe" with no matching event
            document.getElementById("volunteerName").value = volunteer.name;

            const matchedEvent = events.find(event => 
                event.requirements === volunteer.skills && event.date === volunteer.availability
            );

            document.getElementById("matchedEvent").value = matchedEvent ? matchedEvent.name : "No match found";
        }
      </script>
    `;

    fireEvent.click(matchButton);

    const matchedEventInput = document.getElementById("matchedEvent");
    expect(matchedEventInput.value).toBe("No match found");
  });
});
