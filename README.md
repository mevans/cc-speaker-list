# CcSpeakerList

Frontend challenge for CrowdComms

# Tailwind
This was my first time using Tailwind with Angular. Made for a good prototyping experience however due to te angular host components, doesn't work quite as well as it does with other libraries eg. React. This limitation means often having to go into the SCSS files and apply specific tailwind rules to the :host.

# API
The API limitations around not having a supported way to fetch a specific user created some interesting challenges. I ended up solving them by:
 - Using a set seed for all API requests, resulting in consistent results
 - Generating my own 'user id' on the frontend, basically just an incrementing int id (0 being the first user, 1 being the next) 
 - Fetching a specific user by calculating which page they would have been on and then jus

// Tailwind
// API
// New Angular features - injection, control flow, no signals
