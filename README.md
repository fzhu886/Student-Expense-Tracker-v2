# Student Expense Tracker App

## UI Screenshot
![Screenshot 2024-08-25 141124](https://github.com/user-attachments/assets/c5a6bb26-ada8-42c8-95b6-9e2e8d4ee87b)


## Description

The Student Expense Tracker is a React-based web application designed to help students manage their expenses efficiently. It features a user-friendly interface built with Chakra UI, allowing users to set budgets, add expenses, categorize spending, and view reports.

## Features

- Set and update budget
- Add and delete expenses
- Categorize expenses
- View expense reports
- Responsive design with a custom background

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Python 3.8+
- PostgreSQL 12+ 

## Installation

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/fzhu886/Student-Expense-Tracker-v2
   cd Student-Expense-Tracker-v2
   ```

2. Create a virtual environment and activate it:
   ```
   pip install virtualenv
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:
   - Create a database named `student_expense_tracker`
   - Create a user named `expense_tracker_user` with password `secure_password`
   - Grant all privileges on the database to the user

5. Apply migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser for Django admin:
   ```
   python manage.py createsuperuser
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../Student-Expense-Tracker-v2
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   python manage.py runserver
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd Student-Expense-Tracker-v2
   npm start
   ```

## Running the Development Server

To start the development server, run:

```
npm start
```

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

### Backend Deployment

1. Update `ALLOWED_HOSTS` in `settings.py` with your domain or IP address.
2. Set `DEBUG = False` in `settings.py` for production.
3. Configure your web server (e.g., Nginx) to serve Django using WSGI.
4. Set up environment variables for sensitive information (e.g., `SECRET_KEY`, database credentials).

### Frontend Deployment

To create a production build, use:

```
npm run build
```

This command builds the app for production to the `build` folder, optimizing the build for the best performance.



The app is currently deployed on Netlify. To deploy updates:

1. Ensure you have the Netlify CLI installed:
   ```
   npm install -g netlify-cli
   ```

2. Authenticate with Netlify:
   ```
   netlify login
   ```

3. Deploy the app:
   ```
   netlify deploy --prod
   ```

   Use the following details when prompted:
   - Publish directory: `build`
   - Functions directory: Leave blank (press Enter)
   - Deploy without prompts in the future: Yes

Current deployment details:
- URL: https://subtle-daifuku-82781b.netlify.app
- Netlify Token: 6e1ef010498440ecad5a7b4de58fe326

## Customization

- The app uses a custom background image located at `public/student-expense-tracker/background.png`.
- The Parisienne font from Google Fonts is used for the app title and Expense List title.

## Technologies Used

- React
- Chakra UI
- Axios for API requests
- React Hooks for state management

## Contributing

Contributions to improve the Student Expense Tracker are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Fan Zhu - fzhu@ualberta.ca

Project Link: (https://github.com/fzhu886/Student-Expense-Tracker-v2)
