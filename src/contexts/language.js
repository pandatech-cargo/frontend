/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';

import LanguageAPI from 'api/language';

import { errHandler } from 'utils';

export const LanguageStore = createContext();

export function LanguageStoreProvider({ defaultLanguage = 'en', children }) {
  const [language, setLanguage] = useState(defaultLanguage);
  const [languageCollection, setLanguageCollection] = useState({});
  const [loading, setLoading] = useState(false);

  async function getLanguageFromAPI(languageSelected = '') {
    try {
      setLoading(true);
      // TODO: uncomment when BE is ready
      // const { data } = await LanguageAPI.getLanguage(languageSelected);
      // setLanguageCollection(data);
    } catch (error) {
      errHandler(error);
    } finally {
      setLoading(false);
    }
  }

  function changeLanguage(lang) {
    setLanguage(lang);
    getLanguageFromAPI(lang);
  }

  useEffect(() => {
    getLanguageFromAPI();
  }, []);

  return (
    <LanguageStore.Provider
      value={{
        changeLanguage,
        language,
        languageCollection,
        loading,
      }}>
      {children}
    </LanguageStore.Provider>
  );
}

LanguageStoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
