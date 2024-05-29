# Car Rental Management System

Welcome to the Car Rental Management System! This project is designed to manage car rental services efficiently by providing an easy-to-use interface for both customers and administrators.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)


## Features
- **View Available Cars**: Customers can view the list of available cars for rent.
- **Reserve Cars**: Customers can make reservations for available cars.
- **Add New Cars**: Administrators can add new cars to the inventory.
- **Delete Cars**: Administrators can remove cars from the inventory.
- **Change Car Availability**: Administrators can update the availability status of cars.
- **Static Pages**: The system includes static pages for home, reservation, car details, and shop.

## Installation

### Prerequisites
- Node.js
- MySQL

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/car-rental-management-system.git
    cd car-rental-management-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the environment variables:
    Create a `.env` file in the root directory and add your MySQL database credentials:
    ```plaintext
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASS=your_database_password
    DB_NAME=your_database_name
    ```

4. Start the server:
    ```bash
    npm start
    ```
    The server will start at `http://localhost:3000`.

## Usage

### Accessing the System
- Open your web browser and navigate to `http://localhost:3000`.
- You will see the homepage of the Car Rental Management System.

### API Endpoints

#### Get All Cars
- **Endpoint**: `/cars`
- **Method**: `GET`
- **Description**: Retrieves a list of all cars.

#### Add a New Car
- **Endpoint**: `/reserv`
- **Method**: `POST`
- **Description**: Adds a new car to the inventory.
- **Request Body**:
    ```json
    {
      "Model": "string",
      "Make": "string",
      "Year": "number",
      "Transmission": "string",
      "RentalFee": "number",
      "Available": "boolean",
      "CurrentMileage": "number"
    }
    ```

#### Delete a Car
- **Endpoint**: `/DeleteCar`
- **Method**: `DELETE`
- **Description**: Deletes a car from the inventory.
- **Query Parameters**: `plate` (CarID)

#### Change Car Availability
- **Endpoint**: `/ChangeAvailability`
- **Method**: `POST`
- **Description**: Updates the availability status of a car.
- **Query Parameters**: `carID`, `availability`

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MySQL**: Relational database management system.
- **Twig**: Templating engine for rendering static pages.
- **Body-Parser**: Middleware to parse incoming request bodies.

## Environment Variables
The system uses the following environment variables:
- `DB_HOST`: MySQL host.
- `DB_USER`: MySQL user.
- `DB_PASS`: MySQL password.
- `DB_NAME`: MySQL database name.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

Thank you for using the Car Rental Management System! If you have any questions or need further assistance, please feel free to contact me.
