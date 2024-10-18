// Sample data for volunteer history
const volunteerHistory = [
    {
      volunteerId: 'vol123',
      eventId: 'evt001',
      eventName: 'Beach Cleanup',
      participationDate: '2024-10-15',
      status: 'completed'
    },
    {
      volunteerId: 'vol124',
      eventId: 'evt002',
      eventName: 'Food Distribution',
      participationDate: '2024-09-10',
      status: 'completed'
    }
  ];
  
  // Fetch volunteer history by volunteerId
  const getVolunteerHistory = (req, res) => {
    const { volunteerId } = req.params;
    const history = volunteerHistory.filter(h => h.volunteerId === volunteerId);
    if (history.length === 0) {
      return res.status(404).json({ message: 'No history found for this volunteer.' });
    }
    res.json(history);
  };
  
  // Add new history record
  const addVolunteerHistory = (req, res) => {
    const { volunteerId, eventId, eventName, participationDate, status } = req.body;
  
    // Validation
    if (!volunteerId || !eventId || !eventName || !participationDate || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    const newHistory = { volunteerId, eventId, eventName, participationDate, status };
    volunteerHistory.push(newHistory);
    res.status(201).json(newHistory);
  };
  
  module.exports = { getVolunteerHistory, addVolunteerHistory };
  