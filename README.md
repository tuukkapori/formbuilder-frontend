# Formbuilder

This is the front end for the project.

The architecture is divided to four services.

https://github.com/tuukkapori/formbuilder-backend

https://github.com/tuukkapori/formbuilder-pubsub

https://github.com/tuukkapori/formbuilder-cloud-functions

## Formbuilder is software for creating beautiful forms with zero coding.

<img width="1435" alt="Formbuilder-preview" src="https://user-images.githubusercontent.com/87663603/192145911-edf2ff05-6e72-478c-ad58-7d66331ddb1c.png">

### Why does this project exist?

Running the IT for Aalto Investment Club, we had to do lot of forms. Collecting sign ups and feedback for our events.

As we want to make sure our brand looks clean, we wanted our forms to be beatiful as well. That's why google forms and other ugly solutions were out of consideration.

TypeForm, which has inspired this project heavily, was serving us well. Until something happened.

They raised their prices to level which didn't make sense for us. So I figured out...

I can built this myself.

So that's what I did. 

## What does it do?

You can create, design, publish and collect answers for your forms. It's like TypeForm, with less features (so far).

I also built an integration with Google Sheets, so the answers can automatically be saved to sheets also.

## Architecture

Here's a quick overview of the project architecture:

![Formbuilder-architecture](https://user-images.githubusercontent.com/87663603/192144252-50c90e25-51f9-496d-9fec-c503e08df49c.png)



## Here's how I would improve the project:

### 1. Move lot of data to a SQL database.
I chose firestore as a database. Why? I needed it to be free and it served the purpose okay. However, form answers would be better represented in a relational database.

### 2. Improve the admin UI design.
The UI is pretty ugly. I know. My priority was to make the actual form pretty. If I had more time, I'd definitely improve the overall design.

### 3. Serverside-render the form
The form viewing happens in the same domain as admin console and that's not good. That should be separated to indepented service.

For a faster user experience, I would use NextJS or similar framework to generate a static page of the form once it's ready and serve it through CDN.

### 4. Improve types
The TypeScript types are still a little in progress.


## What to test the project?

If you read this far, congratz! You can answer the following form to see it in production.

https://formbuilder-f.vercel.app/v1/5hPBwujr1jDTSvo61r9W

If you want to build forms yourself, send me an email (tuukka.pori@gmail.com) and I'll create an account for you :)


