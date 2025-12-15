# Hosting on Firebase

I've pre-configured your project for Firebase Hosting! Follow these steps to go live.

## Prerequisites
You need the Firebase CLI installed. If you don't have it:
```bash
npm install -g firebase-tools
```

## Step 1: Login & Initialize
1.  Login to Firebase:
    ```bash
    firebase login
    ```
2.  Initialize the project (link this folder to your Firebase project):
    ```bash
    firebase use --add
    ```
    *   Select your project from the list (or create a new one in the [Firebase Console](https://console.firebase.google.com) first).
    *   When asked for an alias, you can type `default`.

## Step 2: Deploy
Since I've already created the `firebase.json` file and run the build, you just need to run:

```bash
firebase deploy
```

This will upload the `dist` folder to Firebase.

## Step 3: Connect Custom Domain (ayushraj.co)
1.  Go to the [Firebase Console](https://console.firebase.google.com).
2.  Open your project -> **Hosting**.
3.  Click **"Add Custom Domain"**.
4.  Enter `ayushraj.co`.
5.  Firebase will give you **TXT records** to verify ownership. Add these to your domain registrar (GoDaddy, Namecheap, etc.).
6.  Once verified, Firebase will give you **A Records**. Add these to your registrar to point the domain to your site.
7.  Wait a few minutes (up to 24h) for SSL to provision.

## Updating Your Site
Whenever you make changes:
1.  `npm run build`
2.  `firebase deploy`
