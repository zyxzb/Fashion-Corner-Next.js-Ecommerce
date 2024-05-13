'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const params = useSearchParams();
  const { data: session } = useSession();

  let callbackUrl = params.get('callbackUrl') || '/';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router, session, params]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <div className='card mx-auto my-4 max-w-sm bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>Sign in</h1>
        {params.get('error') && (
          <div className='alert text-error'>
            {params.get('error') === 'CredentialsSignin'
              ? 'Invalid email or password'
              : params.get('error')}
          </div>
        )}
        {params.get('success') && (
          <div className='alert text-success'>{params.get('success')}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-2'>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input
              type='text'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.email?.message && (
              <div className='text-error'>{errors.email.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password', {
                required: 'Password is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.password?.message && (
              <div className='text-error'>{errors.password.message}</div>
            )}
          </div>
          <div className='my-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'
            >
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              Sign in
            </button>
          </div>
        </form>
        <div>
          Need an account?{' '}
          <Link className='link' href={`/register?callbackUrl=${callbackUrl}`}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
