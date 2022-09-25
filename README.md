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



## What to test the project?

Send me an email (tuukka.pori@gmail.com) and I'll create an account for you :)


