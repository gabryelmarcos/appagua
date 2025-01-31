import '../global.css';

import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY! as string

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }

export default function Layout() {

  return (
    <ClerkProvider publishableKey={publishableKey}>
     <ClerkLoaded>
        <Stack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
