# Project - Night Owl : Status - In Progress

## Hosted Application details
The project is hosted using **Heroku** for the API's and **Netlify** for the UI. The host details are listed below.
 - API : [Night Owl API's](https://project-night-owl.herokuapp.com)
 - UI : [Night Owl User Interface](https://project-night-owl.netlify.app/)
 
 ## Project and Component Details
 This project consist of both API's and UI designed for the site **Night Owl** (An online book hub). 
 
 ### Component / Stack Details
  - Database : Harper DB
  - API : Node.js , Express
  - UI : React
 
 ### Project Details
 The basic details of the project are as follows
  - The project view is divided into 2 personas.
    - Registered end users.
    - Admin users.
  - The site offers a register / sign in page where the usera can register themselves.
  - The registered users can login in to the site using the login page. 
  - **End users** will be able to perform the below actions in the site
    - View the dashboard.
    - Navigate to books page and view all the books that are listed.
    - Search for a book by its title.
    - Filter a book based on category.
    - Filter a book based on author.
    - Sort the book list in ascending and descending order based on the below fields
      - Created Time
      - Ratings
      - Title
    - On hovering a book it displays the description of the book.
    - The book can be clicked to reveal its details.
  - **Admin user** will be able to perform all the action listed under end users. The additional actions allowed are as follows
    - Create a new book from the book listing page.
    - Modify a book from the book details page.
    - Delete a book from the book details page.
  
  ## Project Structure
  The project is broadly split into 2 parts, the api's and the user interface. 
  
  ### API Folder Structure
  The root folder for API development is [/api](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/api).
   - It split into the below folders.
      - [/configuration](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/api/configuration) : All the configuration required to connect to the database.
      - [/controllers](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/api/controllers) : The core logic of API is written inside controllers.
      - [/routes](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/api/routes) : The mapping of the endpoint with its logic is carried out in routes.
      - [/services](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/api/services) : The services related to each component or common service is written here. 
      
   ### UI Folder Structure
   The root folder for UI development is [/ui](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui).
- It is split into the below folders.
  - [/public](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/public) : Defualt folder that contains the index.html file and other images required.
  - [/src](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src) : This folder contains all the core logic implemented. It is futher divided into the below folders.
    - [/components](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src/components) : Each view in the UI is written here. It contains the files for the main app component, navigation bar, footer, dashbaord. It is further split into the below folders.
      - [/books](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src/components/books) : The book view is wriiten here.
      - [/login](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src/components/login) : The login view is written here.
    - [/constants](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src/constants) : The required contants are written here.
    - [/css](https://github.com/PranapSivadasan/AERN-Workshop-Challenge/tree/master/ui/src/css) : The complete styling of the UI is done here.
    
    
## Steps to run the project locally
The API and the UI are to be run separately .
### Run API's
- Navigate into /api folder from the root level
- Run the command ``npm run start``.
- The API server is started and hosted as **http://localhost:8000**.

### Run UI
- Navigate into /ui folder from the root level
- Run the command ``npm run start``.
- The UI server is started and hosted as **http://localhost:3000**.
- To build the UI run the command ``npm run build``
    
    
    
    
    
