# FileSharing
# [LiveLink](https://newportfolio-ebon-tau.vercel.app/)
## Overview

**FileSharing** is a comprehensive web application that enables users to manage files securely. The application features user authentication, profile management, file upload/download, and settings customization. It utilizes Firebase for authentication and storage, providing a secure and efficient platform for file management.

## Features

- **User Authentication**: Secure login and registration with Firebase Authentication.
- **Profile Management**: View and edit user profiles, including profile pictures.
- **File Management**: Upload, download, and delete files using Firebase Storage.
- **Settings**: Customize application preferences including theme switching.
- **Responsive Design**: Fully responsive interface suitable for various devices.

## Technologies Used

- **Frontend**: React, MUI (Material-UI), CSS
- **Backend**: Firebase (Authentication, Storage)
- **Session Management**: Firebase Authentication
- **Deployment**: Firebase Hosting

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Yogender21505/filesharing.git
    ```

2. Navigate to the project directory:

    ```bash
    cd filesharing
    ```

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Create a `.env` file in the root directory and add your Firebase configuration:

    ```plaintext
    VITE_API_KEY=your-api-key
    VITE_AUTH_DOMAIN=your-auth-domain
    VITE_PROJECT_ID=your-project-id
    VITE_STORAGE_BUCKET=your-storage-bucket
    VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_APP_ID=your-app-id
    VITE_SECRET_PASSWORD=your-secret-password
    ```

5. Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

- **Dashboard**: Access various features through the sidebar, including file management and settings.
- **Profile Page**: View and update user information and profile picture.
- **File Management**: Upload new files, download existing files, and delete files from Firebase Storage.
- **Settings**: Switch between light and dark themes.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MUI (Material-UI)](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [React](https://reactjs.org/)
