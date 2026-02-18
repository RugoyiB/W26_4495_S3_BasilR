exports.chatbotReply = (req, res) => {
  const message = req.body.message.toLowerCase();

  let reply = "Sorry, I didn't understand that. Please ask about service times, meetings, or groups.";

  if (message.includes("service")) {
    reply = `
Sunday Service: 10:00 AM – 11:30 AM
Wednesday Prayer: 6:00 PM – 7:30 PM
    `;
  }

  else if (message.includes("location")) {
    reply = `
Address: 6062 132 St, Surrey, BC V3X 1M9
Contact Number:  (604) 591-3599
Email: info@berea.ca
    `;
  }

  else if (message.includes("meeting")) {
    reply = `
Leadership Meeting: First Saturday – 10:00 AM
Youth Meeting: Friday – 5:00 PM
Women's Fellowship: Thursday – 4:00 PM
    `;
  }

  else if (message.includes("group")) {
    reply = `
Church Groups:
- Youth Ministry
- Women's Fellowship
- Men's Fellowship
- Choir
- Ushering Team
    `;
  }

  res.json({ reply });
};
