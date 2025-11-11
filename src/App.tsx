import { ConfigProvider, App as AntApp } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { themeConfig } from './theme';
import { AppContextProvider } from './context/AppContext';

const App = () => (
  <ConfigProvider theme={themeConfig} componentSize="middle">
    <AntApp>
      <AppContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppContextProvider>
    </AntApp>
  </ConfigProvider>
);

export default App;
