# Metricus Site

&#x20;   &#x20;

![python][PYTHON__BADGE] ![flask][FLASK__BADGE] ![javascript][JAVASCRIPT__BADGE] ![css][CSS__BADGE] ![html][HTML__BADGE] ![mysql][MYSQL__BADGE]

<p align="center">
 <a href="#🌍-about-the-project">About</a> •
 <a href="#✨-features">Features</a> •
 <a href="#📌-api-endpoints">API Endpoints</a> •
 <a href="#🛠-technologies-used">Technologies</a>
</p>

## 🌍 About the Project

This project is a web-based conversion tool that allows users to convert various units efficiently. The website is live and accessible to the public, with no need for local installation.

**Live Website:** https://metricus-55e35472726a.herokuapp.com

## ✨ Features

- Fast and accurate unit conversions
- Intuitive and user-friendly interface
- Supports multiple unit types
- History of conversions for logged-in users

## 📌 API Endpoints

This project also provides an API with multiple endpoints for unit conversion.

### 🔄 **Unit Conversion Routes**

These endpoints handle unit conversion requests.

| Route                       | Description                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| GET /conversion             | Retrieve available conversion units                                                     |
| POST /conversion            | Send the clicked unit ID to update the UI and navigate to the calculator                |
| GET /conversion/calculator  | Load the unit conversion calculator based on the previously selected unit               |
| POST /conversion/calculator | Receives user input values and performs the unit conversion based on the provided data. |

### Example Usage

**POST /conversion/calculator**

```json
{
  "simpleValue": 1000,
  "simpleFromUnit": "meter",
  "simpleToUnit": "kilometer",
  "unitName": "length"
}
```

**Response:**

```json
{
    "message": "1 km",
    "success": true
}
```

---

### 🔒 **User Authentication Routes**

These endpoints manage user authentication (login, sign-up).

| Route             | Description               |
| ----------------- | ------------------------- |
| POST /sign-up     | Register a new user.      |
| POST /login       | Log in an existing user.  |
| POST /auth/logout | Log out the current user. |

### Example Usage

**POST /sign-up**

```json
{
  "username": "Test",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User created successfully."
}
```

**POST /login**

```json
{
  "username": "Test",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "Authentication completed successfully!"
}
```

---

### 📝 **History Routes**

| Route                          | Description                                       |
|--------------------------------|---------------------------------------------------|
| GET /conversion/history        | Serves the history page (HTML template).         |
| GET /conversion/history/data   | Retrieves paginated conversion history.          |
| DELETE /conversion/history/delete | Deletes a specific conversion entry by ID.    |
| DELETE /conversion/history/clear  | Clears all conversion history for the user. |

### Example Usage

**GET /conversion/history/data**

**Response:**

```json
{
  "data": [],
  "page": 1,
  "total_items": 0,
  "total_pages": 0
}
```

---

## 🛠 Technologies Used

- **Python** - Used for backend development, handling the core business logic and unit conversions with the Metricus library.
- **Flask** - Lightweight web framework used to build the API and serve the web application.
- **JavaScript** - Essential for frontend interactivity, making the user interface dynamic and responsive.
- **CSS** - Responsible for the styling and layout of the website, ensuring a user-friendly and visually appealing experience.
- **HTML** - The foundation of the webpage structure, defining the content and elements of the web pages.
- **MySQL** - Relational database used to store **users, conversion history, and other relevant data**.
- **Heroku** - Platform-as-a-Service (PaaS) used for hosting the application, making it accessible online with easy deployment and scaling.
- **Railway** - A cloud platform for deploying applications, providing a simple and efficient way to manage infrastructure, deploy updates, and handle database connections.

---

[PYTHON__BADGE]: https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue
[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[FLASK__BADGE]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[CSS__BADGE]: https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white
[HTML__BADGE]: https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white
[MYSQL__BADGE]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
