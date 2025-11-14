import { Outlet } from 'react-router-dom';
import RecruiterSidebar from '../../components/recruiter/RecruiterSidebar';

const RecruiterLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <RecruiterSidebar />
      <main className="flex-grow-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
