import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { Toggle } from '~/components/nativewindui/Toggle';
import { cn } from '~/lib/cn';
import { useCreateSubscriptionMutation } from '~/store/payment/payment';

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = React.useState(false);
  const stripe = useStripe();
  const [createSubscription] = useCreateSubscriptionMutation();

  const handleSubscribe = async () => {
    try {
      // Get the client secret from the backend
      const response = await createSubscription({
        customerId: 'cus_REcK6S09QlG6sO', // Replace with your customer ID
        priceId: 'price_1QCHSaAuSN43C26OOsBHdTdU', // Replace with your price ID
      });

      // Extract the clientSecret
      const { clientSecret } = response?.data || {};

      if (!clientSecret) {
        throw new Error('No client secret found');
      }

      // Initialize the PaymentSheet
      const { error: initError } = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Albayti Real Estate L.L.C.',
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
        returnURL: 'property-save://workspace/create',
        paymentMethodTypes: ['card', 'google_pay', 'apple_pay'], // Add Google Pay and Apple Pay
        // applePay: {
        //   merchantCountryCode: 'ae',
        // },
      });

      if (initError) {
        console.error('Error initializing payment sheet:', initError);
        return;
      }

      // Present the PaymentSheet
      const { error: presentError } = await stripe.presentPaymentSheet();

      if (presentError) {
        console.error('Payment failed:', presentError.message);
        alert(presentError.message);
      } else {
        alert('Subscription created successfully!');
      }
    } catch (err) {
      console.error('Error during subscription:', err);
      alert(err.message);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51NCJw9AuSN43C26O1f8U5X1niKaHqilkHwfJUbmux0qVANvFfc1CdAZNF9FceZfHekHBhuUSm5WnfmSiR6Nw80KU008Kx2G5N7">
      <Stack.Screen
        options={{
          title: 'Subscriptions',
          headerTransparent: Platform.OS === 'ios',
          headerShown: true,
          headerBlurEffect: 'systemMaterial',
          //   headerRight: Platform.select({
          //     ios: () => (
          //       <Button
          //         className="ios:px-0"
          //         variant="plain"
          //         onPress={() => {
          //           router.back();
          //         }}>
          //         <Text className={cn(canSave && 'text-primary')}>Save</Text>
          //       </Button>
          //     ),
          //   }),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Form className="gap-5 px-4 pt-8">
          <FormSection materialIconProps={{ name: 'bell-outline' }} footnote="">
            <FormItem className="ios:px-4 ios:pb-2 ios:pt-2 flex-row justify-between px-2 pb-4">
              <View className="w-40 flex-row items-center justify-between">
                <Text className="font-medium">Free trial</Text>
              </View>
              <Toggle value={theme} onValueChange={handleSubscribe} />
            </FormItem>
          </FormSection>

          {Platform.OS !== 'ios' && (
            <View className="items-end">
              <Button
                className={cn('bg-muted px-6')}
                // disabled={!canSave}
                onPress={() => {
                  router.back();
                }}>
                <Text>Save</Text>
              </Button>
            </View>
          )}
        </Form>
      </ScrollView>
    </StripeProvider>
  );
}
