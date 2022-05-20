# Foliaging

Access live demo site [here](https://foliaging.netlify.app/)

<figure>
    <img src="/readme/devices_mockup.png" height="450" alt="Device Mockups for Foliaging">
</figure>

Test Accounts:
1. Admin Panel at https://tgc16-foliaging-express.herokuapp.com/accounts/login
 - username: foliaging_admin
 - password: rotiPRATA@123

2. Customer at https://foliaging.netlify.app/login
 - username: test_customer1 
 - password: rotiPRATA@123

## Background

Indoor plants sales are booming as a result of urbanisation, interior design trends and millennials’ desire to have something to nurture and care for.

According to experts, the rise in sales of indoor plants and plant accessories, as well as the prominence of Instagram influencers – social media personalities with tens of thousands of followers – speaks to a growing trend among young people.[^1]

## Project Overview

Due to the pandemic, this trend continues to grow amongst younger group of working adults and families. Singapore do have community based on this trending interest, but eCommerce targetted to this group of people is still not mature yet. So it is a perfect chance to go into the market to provide a range of house plants, from inexpensive beginner friendly ones to specially cultivated plants.

---

## The Five Planes of UI/UX

### Strategy

#### Organization's Goals
To take advantage of increased interest in house plants and cater for a trending market targetted at younger Singaporeans.

#### Users' Goals
As there is a high home ownership in Singapore, combined with the spread of this new trend via social media, young families may look for creative ways to spruce up their homes using house plants with decorative foliage. While younger working adults may have interest in house plants due to it being easier to care for compared to pets, thus suitable for abusy schedule. On top of that, some may have vested interest in getting rarer varieties.

1. **Organisation**
   - Objective: To have an eCommerce ready for interested hobbyists and beginners 
2. **Users: Homeowners**
   - Objective: To look for attractive plants to spruce up their house
   - Needs:
      - Able to search for species that is known for their foliage
      - Able to search for plants that tolerates shades
   - Demographics and Characteristics:
       - New homeowners
       - Probably beginners in this area
       - Have a larger budget and will look for larger and more expensive variants to decorate their house
   - Pain point:
       - Not a lot of eCommerce to choose from for house plants

2. **Users: Young Working Adults**
   - Objective: To look for plants that suits their busy lifestyle and is easier on the pockets
   - Needs:
      - Able to filter plants and any accessories by price range due to budget
      - Able to search for plants that tolerates neglect
   - Demographics and Characteristics:
       - Younger working adults influenced by social media
       - Have limited space and will look for smaller and easier to care plants
       - May include collectors looking for unique varieties
   - Pain point:
       - Available eCommerce may not have the option to filter by how easy it is to take care of a plant

User Stories | Acceptance Criteria(s)
------------ | -------------
As a homeowner, I would like to buy plants with varying patterns to decorate my living space | Plants need to be labelled if they have foliage patterns for filtering option
As a homeowner, I would like to be able to search for bigger plants to fit into certain spaces at home | Plants need to be categorized by sizes for filtering option
As a homeowner, I would like to be able to get indoor plants that has air-purifying quality | Plants needs to be labelled if they are air-purifying for filtering option
As a working adult with busy schedule, I would like to get plants with minimum effort to care for at home | Plants needs to be categorized by care difficulty, and watering needs for filtering option
As a working adult, I would like to get plants that are shade loving so to add to office space | Plants needs to be categorized by light requirement for filtering option

### Scope

### Database
<figure>
    <img src="/readme/erd.png" height="450" alt="Entity Relationship Diagram">
</figure>

ERD is drawn up to demonstrate the different relationship between enitities for the site before proceeding to model the database (SQL).

<figure>
    <img src="/readme/sql_dbm.png" height="450" alt="Logical Schema">
</figure>

Logical Schema is drawn up based on the ERD diagram to show the relationship between tables and also the number of columns with its type defined.

A backend server will thus be necessary in order to allow communication between the site and database. As such an Express server have been set up and deployed to [Heroku](https://www.heroku.com/). API endpoints are accessible via the base at https://tgc16-foliaging-express.herokuapp.com/api.

#### Content
As this is an eCommerce platform, shop owner will have to provide the content and products. Products, customers and orders will need to be managed. Express servers also serves as an admin panel for management of data, and it be accessed after registering at https://tgc16-foliaging-express.herokuapp.com/accounts/register.

#### eCommerce
- Search function against attributes such as Title, Description, Details
- Filter function of all products depending on its type, but it should include watering frequency, light requirements, care level and other characteristics for plants
- Register as a customer
- Login and cart management as a customer
- Password, profile and address management as a customer
- Payment processing and ordering as a customer

#### Admin
- Search function against attributes such as Title, Description, Details to look for specific products
- Register as an employee
- Login and password management as a user
- Create, update, delete and read all available products
- Able to view orders and update its status

#### Non-functional
- Mobile responsiveness: forms and search results display should not obstruct users' experience in the site
- Accessibility: colors used are safe for colorblind, interactive elements have aria-labels for assistive technology 
- Performance: database may get larger and slower to load overtime, a loading screen is included on eCommerce to help bridge the gap between site and data loading

### Structure and Skeleton
Initial prototyping and sitemap can be found at the Miro board [here](https://miro.com/app/board/uXjVO7NurkU=/?share_link_id=259396612000)

The prototype is done with a mobile first approached and throughout the project it have been re-visited several times while working on the project and styling across devices. 

### Surface

In order to complement various design and layouts intended for the site, [MUI](https://mui.com/) have been chosen for its design system. Also because MUI is a set of React UI tools that are component based which will help to ease development time spent.
#### Branding

Brand name is a word play on foraging and foliage to convey the pursuit of plant owners always hunting for wild and exotic looking plants suitable for their home gardens whether indoors or outdoors.

Cedarville Cursive font has been chosen for the branding as it is in a handwriting style that helps to bring about the idea of how personal owning plants is, it also adds on to the natural vibe of this community.

Medium champagne color have been selected as it is in between green and yellow which is mostly found in the sought-after variegated series of a genus. Also as the site will be mostly in green background, it also serves to contrast.

#### Color Scheme

<figure>
    <img src="/readme/color_scheme.png" height="450" alt="Color Scheme">
</figure>

- Light bright yellow (champagne like) color and brighter green have been chosen as the primary and secondary colors mentioned previously
- The rest of the colors are then randomly generated via [Coolors](https://coolors.co/)
- Darker colors in the same color range are chosen to be used for backgrounds or underlying layers
- Lighter colors are chosen to be used to highlight containers and to serve as text color

#### Font
_Montserrat Alternatives_ have been chosen as the font for heading. Tt was designed around unique urban typography found in old posters and signs in Montserrat itself.

_Montserrat_ is used for all body text meant for reading, to complement the alternative and special design in its Alternates family.

Monstserrat sister fonts are all based on urban typograhy and thus it is used to contrast with the organic shapes and natural vibe in the background, in order to convery the idea of bringing plants into living space.

---

## Testing
Test Cases can be found [here](/readme/test_cases.xlsx)

---

## Dependencies and Sources

### Backend
1. [Express](https://expressjs.com/) as the framework for routing to project's endpoints
2. [db-migrate](https://db-migrate.readthedocs.io/en/latest/) as the database migration framework
3. [Axios](https://axios-http.com/) as HTTP client to external endpoints
4. [Bookshelf.js](https://bookshelfjs.org/api.html) for accessing database on SQL databases 
5. [caolan forms](https://github.com/caolan/forms) to help create and validate forms in the backend and on admin panel
6. [dayjs](https://day.js.org/) is used to convert datetime to preferable format
7. [cors](https://www.npmjs.com/package/cors) as middleware to enable CORS
8. [dotenv](https://www.npmjs.com/package/dotenv) to separate code from envrionment variables
9. [express-session](https://www.npmjs.com/package/express-session) as the session management middleware
10. [express-flash](https://github.com/RGBboy/express-flash) as flash messages middleware
11. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) as the authentication framework with Frontend
12. [handlebars](https://handlebarsjs.com/) as the templating language to generate HTML for admin panel
13. [Tailwind](https://tailwindcss.com/) as the UI library for admin panel
14. [Tailwind UI Kit](https://app.tailwinduikit.com/) as the basis of components used in admin panel
15. [Uploadcare](https://uploadcare.com/docs/) as the digital assets mangement for products' images

### Frontend
1. [React](https://reactjs.org/) as the frontend framework
2. [React Router DOM](https://reactrouter.com/docs/en/v6/getting-started/overview) for routing paths in React app
3. [Axios](https://axios-http.com/) as HTTP client to Express server endpoints
4. [MUI](https://mui.com/material-ui/getting-started/installation/) as UI library for the React app
5. [React MUI Carousel](https://github.com/Learus/react-material-ui-carousel) is used as carousel component
6. [stripe](https://stripe.com/en-gb-sg) as payment gateway
7. [remixicon](https://remixicon.com/) as icons used for the site
8. [boring-avatars](https://boringavatars.com/) to dynamically generate user avatar based on email
9. [react-dayjs](https://github.com/devshawn/react-dayjs) is used to convert datetime to preferable format
10. [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) is used for swipeable tab panels in Profile

### Platforms and Software
1. [Git](https://git-scm.com/) for version control
2. [GitHub](http://github.com) for the repository
3. [Visual Studio Code](https://code.visualstudio.com/) for code editing
4. [Heroku](https://www.heroku.com/) for deployment of Express server
5. [Netlify](https://www.netlify.com/) for deployment of React app

### Images and Logos
1. Logo used is a composition of a vector downloaded from [Freepik](https://www.freepik.com/vectors/logo-pack) and edited online to place border and font
2. Background image used in Admin panel is downloaded from [Freepik](https://www.freepik.com/free-vector/hand-drawn-minimal-background_15364643.htm)
3. Background image used in Login and Register in React is downloaded from [Freepik](https://www.freepik.com/free-vector/collection-social-media-templates-with-fluid-shapes-brown-orange-blue_17339743.htm)
4. Banner background image used in React is downloaded from [Vecteezy](https://www.vecteezy.com/vector-art/6873801-abstract-modern-poster-tropical-leaves-with-shapes-printable)
5. All plants and supplies images are from [Noah Garden Center](https://www.noahgardencentre.com.sg/)
6. All planters images are from [fortytwo](https://www.fortytwo.sg/home-decor-lifestyle/vases.html)
7. Header background image is generated using [Svg Wave](https://svgwave.in/)
8. Homepage banner is a photo by [Joel Henry](https://unsplash.com/photos/4Ue1u2iwj-c) downloaded from [Unsplash](https://unsplash.com)
8. Homepage Latest header background image is a photo by [Ripley Elisabeth Brown](https://unsplash.com/photos/DmaYXFqGLPw) downloaded from [Unsplash](https://unsplash.com)
   
### Other Attributions
1. [Paul Chor](https://github.com/kunxin-chor) for all his guidance and using his tutorials as references for the codes 
2. [Coolors](https://coolors.co/) for matching the green and mecca gold selected

---
## Build
Backend is build using Node.js and Express. Frontend have been created with create-react-app which includes a webpack that builds the files for production environment.

### Express environment variables
Some .env variables are set in the backend and it includes:

1. Timezone for the server
    ```
    TZ
    ```
2. Database driver and access 
    ```
    DB_DRIVER
    DB_HOST
    DB_NAME
    DB_USER
    DB_PASSWORD
    ```
3. The like keyword syntax for SQL database 
    ```
    LIKE_SYNTAX
    ```
4. Uploadcare keys to access its API
    ```
    UPLOADCARE_PUBLIC_KEY
    UPLOADCARE_SECRET_KEY
    ```
5. Keys for session management on admin and eCommerce
    ```
    COOKIE_SECRET_KEY
    SESSION_SECRET_KEY
    TOKEN_SECRET
    TOKEN_EXPIRY
    REFRESH_TOKEN_SECRET
    REFRESH_TOKEN_EXPIRY
    ```
6. Stripe keys to access API and use webhooks
    ```
    STRIPE_PUBLISHABLE_KEY
    STRIPE_SECRET_KEY
    STRIPE_ENDPOINT_SECRET
    STRIPE_SUCCESS_URL
    STRIPE_CANCEL_URL
    ```

### Database migrations
The database and data can be migrated to any SQL running the following command at the root of the Express project folder:
```
node database/db-migrate-up.js
```

The command will recreate tables and sample data except on any user dependant information such as system accounts, customer accounts, cart items, orders, payments and products.

## Deployment
### Backend Deployment
Express server is deployed using [Heroku](https://www.heroku.com/).

Prerequisites:
- Heroku is connected and authorized to Github account under "Deploy"
- Correct repository is selected under "App connected to Github"
- Automatic deploys have been enabled for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Heroku will perform automatic deployments upon detecting changes

### Frontend Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/24d0b156-5ce6-440f-832d-f37cf429d50c/deploy-status)](https://app.netlify.com/sites/muslimgowhere/deploys)

The React app is hosted using [Netlify](https://www.netlify.com/).

Prerequisites:
- Any edits were added, commited, and pushed to Github repository
- Netlify is connected and authorized to Github account
- Netlify is connected to GitHub repository via "New site from Git"
- "GitHub"  has been selected for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Netlify will start to build and perform automatic deployments upon detecting changes

---

[^1]: Background taken from [here](https://www.theguardian.com/lifeandstyle/2019/aug/11/indoor-plant-sales-boom-reflecting-urbanisation-and-design-trends)
