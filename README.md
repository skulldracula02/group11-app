 # Adventure Escape SA

Adventure Escape SA is a mobile-first app and web experience for discovering outdoor activities in South Africa. Visitors can browse adventure packages, review activity details, estimate booking fees, and find the business's contact information.

## Features

- Browse family, hiking, ziplining, kayaking, corporate, and rock-climbing experiences.
- View package descriptions, photos, age guidance, group sizes, and prices where available.
- Select activities to see an estimated total with applicable discounts and VAT.
- Find contact details and links for reaching Adventure Escape SA.
- Run as an Expo app or export a static web build for hosting on Vercel.

## Built with

- [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing
- TypeScript
- [Vercel](https://vercel.com/) for static web hosting

## Requirements

- Node.js (a current LTS release is recommended)
- npm

## Run locally

Clone the repository and install its dependencies:

```bash
git clone https://github.com/skulldracula02/group11-app.git
cd group11-app
npm install
```

Start the Expo development server:

```bash
npm start
```

Use the Expo terminal menu to open the app in Expo Go or a simulator. To run specifically in a browser, use:

```bash
npm run web
```

## Deploy to Vercel

This repository includes a `vercel.json` that exports the Expo web app with `npx expo export --platform web` and publishes the generated `dist` directory.

### Deploy from the Vercel dashboard

1. Push the project to the GitHub repository: [skulldracula02/group11-app](https://github.com/skulldracula02/group11-app).
2. In [Vercel](https://vercel.com/), choose **Add New → Project** and import that GitHub repository. Authorize Vercel to access the repository if prompted.
3. Keep the project root set to `.` (the repository root). The `vercel.json` deployment settings should be detected automatically:
   - **Build command:** `npx expo export --platform web`
   - **Output directory:** `dist`
   - **Framework preset:** Other
4. Select **Deploy**. Vercel will install dependencies, build the static web export, and provide a deployment URL when the build completes.
5. Future pushes to the connected branch trigger new deployments. Pull requests can receive preview deployments.

### Deploy with the Vercel CLI

From the repository root, run:

```bash
npm install
npx vercel
```

Follow the prompts to link the project to your Vercel account. To deploy to production after linking, run:

```bash
npx vercel --prod
```

You can also create and inspect the web build locally with:

```bash
npx expo export --platform web
```

The exported site is written to `dist/`.

## Project structure

```text
app/
├── App.tsx                 # Main app experience
├── appData.ts              # Adventure packages, fees, and contact details
├── src/app/                # Expo Router routes
├── src/components/         # Shared UI components
├── assets/images/          # App and activity images
├── app.json                # Expo configuration
└── vercel.json             # Vercel web build configuration
```

## Useful commands

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run web` | Start the app in a browser |
| `npm run android` | Start the app for an Android target |
| `npm run ios` | Start the app for an iOS target |
| `npm run lint` | Run Expo's ESLint checks |
| `npx expo export --platform web` | Build the static web export in `dist/` |

## Notes

- The Vercel deployment hosts the web version of the app. Use Expo/EAS workflows to build native Android and iOS applications.
- Package rates, age guidance, availability, and activity requirements may change. Confirm details with Adventure Escape SA before booking.
