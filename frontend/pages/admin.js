import Navbar from '../components/Navbar';
import AdminPage from '../components/Admin/AdminPage';

export default function Admin() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <AdminPage />
      </main>
    </div>
  );
}