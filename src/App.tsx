import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';

function AppComponent() {
  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export const App = observer(AppComponent);
