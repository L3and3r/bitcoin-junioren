import { LanguageProvider } from './contexts/LanguageContext';
import BitcoinVoorJunioren from './BitcoinVoorJunioren';

function App() {
  return (
    <LanguageProvider>
      <BitcoinVoorJunioren />
    </LanguageProvider>
  );
}

export default App;
