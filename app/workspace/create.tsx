import { useStripe } from '@stripe/stripe-react-native';
import { Link } from 'expo-router';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import { Text } from '~/components/nativewindui/Text';
import { useCreateSubscriptionMutation } from '~/store/payment/payment';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function PropertyCreateScreen() {
  const { toggleColorScheme } = useNativewindColorScheme();
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
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4">
        <View className="ios:pt-8 pt-12">
          <Text> create form</Text>
          <Link href="/profile">
            <Text>profile</Text>
          </Link>
          <Button onPress={handleSubscribe} title="Payment" />
          <Button title="dark-light" onPress={() => toggleColorScheme()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
