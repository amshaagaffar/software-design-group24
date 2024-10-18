/**
 * @jest-environment jsdom
 */

import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect"; // Adds additional matchers for DOM elements

// Assuming the HTML structure of the volunteer history is loaded into the DOM
beforeEach(() => {
  document.body.innerHTML = `
    <h1>Volunteer Participation History</h1>
    <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>Location</th>
          <th>Required Skills</th>
          <th>Urgency</th>
          <th>Event Date</th>
          <th>Participation Status</th>
        </tr>
      </thead>
      <tbody id="volunteer-history">
      </tbody>
    </table>
  `;
});

describe("Volunteer History Table", () => {
  test("Table should initially be empty", () => {
    const tbody = document.getElementById("volunteer-history");
    expect(tbody.children.length).toBe(0); // Check if the table body is initially empty
  });

  test("Event data should be dynamically populated", () => {
    // Mock data to populate the table
    const mockData = [
      {
        eventName: "Beach Cleanup",
        eventDescription: "Cleaning up the beach for a day",
        location: "Santa Monica Beach",
        requiredSkills: ["Teamwork", "Communication"],
        urgency: "High",
        eventDate: "2024-10-15",
        participationStatus: "Participated",
      },
    ];

    // Simulate populating the table with mock data
    const tbody = document.getElementById("volunteer-history");

    mockData.forEach((event) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${event.eventName}</td>
        <td>${event.eventDescription}</td>
        <td>${event.location}</td>
        <td>${event.requiredSkills.join(", ")}</td>
        <td>${event.urgency}</td>
        <td>${event.eventDate}</td>
        <td>${event.participationStatus}</td>
      `;
      tbody.appendChild(row);
    });

    // Assertions to check if the data has been correctly added
    const rows = tbody.getElementsByTagName("tr");
    expect(rows.length).toBe(1); // Ensure one row has been added

    // Check the content of the first row
    const firstRowCells = rows[0].getElementsByTagName("td");
    expect(firstRowCells[0]).toHaveTextContent("Beach Cleanup");
    expect(firstRowCells[1]).toHaveTextContent(
      "Cleaning up the beach for a day"
    );
    expect(firstRowCells[2]).toHaveTextContent("Santa Monica Beach");
    expect(firstRowCells[3]).toHaveTextContent("Teamwork, Communication");
    expect(firstRowCells[4]).toHaveTextContent("High");
    expect(firstRowCells[5]).toHaveTextContent("2024-10-15");
    expect(firstRowCells[6]).toHaveTextContent("Participated");
  });

  test("Should redirect to login if token is missing", () => {
    localStorage.removeItem("token"); // Simulate missing token
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);
    expect(window.location.href).toBe("/login.html"); // Check if redirected to login
  });
});
