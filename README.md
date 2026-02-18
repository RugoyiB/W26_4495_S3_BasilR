# W26_4495_S3_BasilR

- Project Name :- Church Administration System
- Student Name :- Basil Rugoyi
- Student ID# :- 300371550
- Student Email ID :- rugoyib@student.douglascollege.ca

The Church Administration System is a secure, role-based web application designed to support the administrative and operational needs of a church organization. The system centralizes the management of users, church members, attendance records, and financial data, while enforcing strict authentication and authorization controls to protect sensitive information.

The system is developed using modern full-stack web technologies and follows best practices in security, scalability, and maintainability.

# Installation Instructions
- Visual Studio Code
Download Visual Studio Code on the following link :- https://visualstudio.microsoft.com/downloads/
scroll down to Visual Studio Code and click Free Download
choose (Windows x64 User Installer)
double click the setup file downloaded to the Downloads folder
Accept the agreement and click Next
continue clicking Next until you get to the Install button
click Install
Then click Finish

- Node.js
Install Node.js using the following link :- https://nodejs.org
click Get Node.js on the screen that pops up.
click at the top highlighted in green, the line (latest node.js version) to get the latest version
scroll down and click Windows Installer (.msi)
Install it using default settings — this automatically installs npm.

- Environment Variables
Open Environment Variables
Press Start
Type “Edit the system environment variables”
Open it
Click Environment Variables…

- Edit the PATH
Under System variables:
Scroll to Path
Click Edit
Click New
Add the below two lines:

C:\Program Files\nodejs\
C:\Users\<Your User Name>\AppData\Roaming\npm

- Web Browser
Google Chrome or Microsoft Edge is recommended.

- Clone the GitHub Repository
Open a terminal or command prompt and run:
git clone https://github.com/RugoyiB/W26_4495_S3_BasilR.git
cd W26_4495_S3_BasilR

- Open Visual Studio Code on your PC / Laptop
In Visual Studio Code
click file -> open folder -> locate the file (W26_4495_S3_BasilR)
Open Terminal
type cd backend
type npm install express mongoose cors dotenv
type npm install
type npm install jsonwebtoken
type npm install bcryptjs
type node createAdmin.js
type npm install open
