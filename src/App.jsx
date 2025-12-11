/**
 * Main App component
 * Sets up context provider and error boundary
 */
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Translator from './pages/Translator';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Translator />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
