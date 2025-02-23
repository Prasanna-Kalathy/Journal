# Alpha Journal

A dynamic activity tracking and routine management web application that helps users log and monitor their daily activities with time-based suggestions and screen time tracking.

## 🌟 Features

- **Real-time Activity Logging**: Log activities with automatic time slot detection
- **Smart Suggestions**: Get routine suggestions based on time slots
- **Screen Time Tracking**: Monitor screen vs. non-screen activities
- **Category Management**: Organize activities into Routine, Career, Personal, Chat, and Sleep
- **Date Management**: Track activities by date with automatic current date selection
- **Dynamic Time Slots**: 48 half-hour slots from 5:00 AM onwards
- **Google Sheets Integration**: Automatic data storage and retrieval
- **Responsive UI**: Dark-themed, mobile-friendly interface
- **Real-time Feedback**: Loading indicators and status messages

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd alpha-journal
   ```

2. **Google Apps Script Setup**
   - Create a new Google Spreadsheet
   - Open Script Editor (Extensions > Apps Script)
   - Copy the contents of `googleAppScript.js` into the editor
   - Deploy as web app
   - Set permissions to "Execute as: Me" and "Who has access: Anyone"
   - Copy the deployed URL

3. **Configuration**
   - Open `script.js`
   - Replace `scriptURL` with your Google Apps Script deployed URL
   - Save the changes

4. **Spreadsheet Setup**
   - Create two sheets named "Routine" and "JAN"
   - Format "Routine" sheet with columns A to G
   - Format "JAN" sheet with appropriate date rows and time slot columns

5. **Launch Application**
   - Open `index.html` in a web browser
   - Or deploy to your preferred web hosting service

## 📋 Prerequisites

- Modern web browser with JavaScript enabled
- Google account for spreadsheet access
- Basic understanding of Google Apps Script (for modifications)

## 🔧 Development Setup

1. **Local Development**
   ```bash
   # Using Python's built-in server
   python -m http.server 8000

   # Or using Node's http-server
   npx http-server
   ```

2. **Files Structure**
   ```
   alpha-journal/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── googleAppScript.js
   └── README.md
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details

## 👥 Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- Google Apps Script team for the robust backend solution
- Contributors and testers