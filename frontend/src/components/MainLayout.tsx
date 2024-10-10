import  AppBar from '../components/Appbar'
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
        <AppBar />
        <main>
        <Outlet />
        </main>
        </div>
  );
};

export default MainLayout;