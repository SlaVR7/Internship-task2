import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';

function AppComponent() {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export const App = observer(AppComponent);
