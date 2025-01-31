import { View, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';  

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

  const googleOAuth = useOAuth({strategy: 'oauth_google'});
  const router = useRouter(); 

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  async function loginGoogle() {
    try {
      const oAuthFLow = await googleOAuth.startOAuthFlow();

      if (oAuthFLow.authSessionResult?.type === 'success') {
        if (oAuthFLow.setActive) {
          oAuthFLow.setActive({
            session: oAuthFLow.createdSessionId
          });

          router.push('/(auth)'); 
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl mb-4">Olá! Faça login com o Google</Text>
      <TouchableOpacity
        className="bg-blue-500 py-3 px-6 rounded-full flex-row items-center justify-center"
        onPress={loginGoogle}
      >
        <Text className="text-white font-bold">Login com Google</Text>
      </TouchableOpacity>
    </View>
  );
}
