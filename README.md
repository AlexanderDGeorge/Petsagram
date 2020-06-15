# Petsagram

## Technologies

-   ReactJS
-   Firebase (NoSQL Database)
-   Cloud Firestore
-   HTML5
-   CSS3

## Summary

Petsagram is a social networking application built around pets and inspired by Instagram. Petsagram currently has prebuilt user profiles mimicking what a user profile would look like. The application focuses on user posts and the interaction of users through posts (likes, reactions, comments) and messaging.

## Features

-   Demo Login
-   User Authentification
-   OAuth integration (Sign-in with Google)
-   User Profile and Account
-   User Connection
-   Posts
-   Post Interaction
-   Search

## Demo Login

Users are presented with a login form. A demo account is available to use.

## User Authentification

Users are presented with a login form. Returning users can use their credentials to log in and access their account. New users can sign up for a new account using their email and creating a password. If a user signs up a verification email will be sent to the email included in the sign up form. Accounts do not need to be verified to be used.

## OAuth Integration

OAuth is integrated into the user authentification form. Users can log in and sign up using their Google account.

## User Profile and Account

Users have full access to control over their profile and account once authenticated. Users can update their profile pictures, username, name, bio, and more. Users can reset their password, but there email address must be verified. Users can also delete their account and all associated data if they choose.

## User Connection

Users can follow other users which allows them to see all content uploaded by the followed user. 

## Posts

Users can upload images and captions to create a post. New posts are added to that user's feed and the feed of all users that follow the posting user. Posts captions can be updated. Posts and the hosted images can be delete by the user that posted the content. Upload images are hosted by Google's Cloud Firestore and are only associated with the user's post. Posts are updated in realtime.

## Post Interaction

Users can interact with posts through likes, comments, and reactions. Post interactions are updated in realtime and can be seen by other users upon submission. 

## Search

Users can search for other users through a text input field. The current search filters users based off of their username and name.

## Messaging
This feature is still being built. When it is complete this section will be updated.
