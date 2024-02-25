import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';

function AppComponent() {
  return (
    <Layout className={'min-h-[100vh]'}>
      <Header />
      <Layout.Content className={'flex flex-col flex-grow bg-primaryColor dark:bg-grayMColor'}>
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export const App = observer(AppComponent);
