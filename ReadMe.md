# Movie Search Application

This is a single-page application (SPA) built with React and Material-UI (MUI) that allows users to search for movies and bookmark them for later viewing. The application fetches movie data from a backend API and displays the results in a user-friendly interface.

## Features

- **Search Movies**: Users can search for movies using a search bar. The search results are displayed as a list of movie cards.
- **Bookmark Movies**: Users can bookmark movies from the search results. The bookmarked movies are stored in the browser's local storage and can be viewed in the bookmarks tab.
- **Tabs**: The application has two tabs: one for displaying search results and another for displaying bookmarked movies.

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Material-UI (MUI)**: React components for faster and easier web development
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Docker**: Platform for developing, shipping, and running applications
- **NGINX**: Web server that can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache

## Running the Application

The application is containerized using Docker. To run the application, you need to have Docker and Docker Compose installed on your machine.

### Prerequisites

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Steps to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Kevin1289/Movie-Search-Application
   cd Movie Search Application
   ```

2. **Run the Frontend**

   ```bash
   cd frontend
   docker-compose up
   ```

3. **Run the Backend**

   ```bash
   cd backend
   docker-compose up
   ```

4. **Access the Application**

   The application should now be running on [http://localhost:3000](http://localhost:3000).
   

