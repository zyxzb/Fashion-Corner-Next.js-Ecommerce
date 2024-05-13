import AdminLayout from '@/components/admin/AdminLayout';

import Products from './Products';

const AdminProductsPge = () => {
  return (
    <AdminLayout activeItem='products'>
      <Products />
    </AdminLayout>
  );
};

export default AdminProductsPge;
