import { LanguageStoreProvider } from 'contexts/language';

/**
 * Wrapper function for all Provider
 * @param {Object} props
 */
export function MainProvider({ children }) {
  return (
    <LanguageStoreProvider defaultLanguae="en">
      {children}
    </LanguageStoreProvider>
  );
}
