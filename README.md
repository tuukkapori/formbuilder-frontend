# Formbuilder

This is the front end for the project.

The architecture is divided to four services.
https://github.com/tuukkapori/formbuilder-backend
https://github.com/tuukkapori/formbuilder-pubsub
https://github.com/tuukkapori/formbuilder-cloud-functions

## Formbuilder is software for creating beautiful forms with zero coding.

### Why does this project exist?

Running the IT for Aalto Investment Club, we had to do lot of forms. Collecting sign ups and feedback for our events.

As we want to make sure our brand looks clean, we wanted our forms to be beatiful. That's why google forms and other ugly solutions were out of consideration.

TypeForm, which has inspired this project heavily, was serving us well. Until something happened.

They raised their prices to level which didn't make sense for us. So I figured out...

I can built this myself.

So that's what I did. 

## Architecture

The front-end is hosted on Vercel, backend is running on Google Cloud Platform. 

I didn't have experience with GCP, so figured this would be a great opportunity to learn that.


## Here's how I would improve the project:

# 1. Move lot of data to a SQL database.
I chose firestore as a database. Why? I needed it to be free and it served the purpose okay. However, form answers would be better represented in a relational database.

# 2. Improve the admin UI design.
The UI is pretty ugly. I know. My priority was to make the actual form pretty. If I had more time, I'd definitely improve the overall design.

# 3. Serverside-render the form
The form viewing happens in the same domain as admin console and that's not good.

For a faster user experience, I would use NextJS or similar framework to generate a static page of the form once it's ready and serve it through CDN.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
