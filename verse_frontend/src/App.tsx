import { SignUpPage } from "./components/SignUpPage";
import { SignInPage } from "./components/SignInPage";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <>
      {currentPage === 'signup' && <SignUpPage />}
      {currentPage === 'signin' && <SignInPage />}
    </>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}