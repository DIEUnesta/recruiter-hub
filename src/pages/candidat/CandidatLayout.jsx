import { Outlet } from 'react-router-dom';
import CandidatSidebar from '@/components/candidat/CandidatSidebar';

const CandidatLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      <CandidatSidebar />
      <div className="flex-grow-1 bg-light">
        <Outlet />
      </div>
    </div>
  );
};

export default CandidatLayout;
