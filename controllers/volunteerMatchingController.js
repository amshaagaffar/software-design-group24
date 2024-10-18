// Sample data for volunteers and events
const volunteers = [
    {
      volunteerId: 'vol123',
      skills: ['cleaning', 'organizing'],
      location: 'New York',
      preferences: ['short-term'],
      availability: ['weekends']
    },
    {
      volunteerId: 'vol124',
      skills: ['cooking', 'distributing'],
      location: 'Los Angeles',
      preferences: ['long-term'],
      availability: ['weekdays']
    }
  ];
  
  const events = [
    {
      eventId: 'evt001',
      requiredSkills: ['cleaning'],
      location: 'New York',
      urgency: 'high'
    },
    {
      eventId: 'evt002',
      requiredSkills: ['cooking'],
      location: 'Los Angeles',
      urgency: 'medium'
    }
  ];
  
  // Match volunteers based on event requirements
  const matchVolunteersToEvent = (req, res) => {
    const { eventId } = req.params;
    const event = events.find(e => e.eventId === eventId);
  
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
  
    const matchedVolunteers = volunteers.filter(v =>
      v.skills.some(skill => event.requiredSkills.includes(skill)) &&
      v.location === event.location
    );
  
    if (matchedVolunteers.length === 0) {
      return res.status(404).json({ message: 'No volunteers matched for this event.' });
    }
  
    res.json(matchedVolunteers);
  };
  
  module.exports = { matchVolunteersToEvent };
  