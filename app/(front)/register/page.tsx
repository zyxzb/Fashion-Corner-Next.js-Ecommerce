import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'Register',
};

const RegisterPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default RegisterPage;
