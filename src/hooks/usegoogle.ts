import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const signInWithGoogle = async (
  onSuccess: (userCredential: any) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    GoogleSignin.configure({
      webClientId:
        "572084472316-2e9m0s0o6ibmdqgivk4rj3t0jjpjq86q.apps.googleusercontent.com",
    });

    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const signInResponse = (await GoogleSignin.signIn()) as {
      data: {
        idToken: string;
        user: {
          email: string;
          name: string;
          photo: string;
        };
      };
    };

    const { idToken } = signInResponse.data;

    const credential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(credential);

    console.log("User UID:", userCredential.user.uid);

    onSuccess(userCredential);
  } catch (error) {
    console.error("Google Sign-In error:", error);
  } finally {
    setLoading(false);
  }
};

export const signOutWithGoogle = async () => {
  try {
    await auth().signOut();

    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();

    console.log("Cierre de sesión exitoso");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
