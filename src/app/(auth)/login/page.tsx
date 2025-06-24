'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Back from '@/components/common/back';
import Button from '@/components/features/auth/button';
import InputForm from '@/components/features/auth/input-form';
import { login } from '@/services/api/auth';
import { LoginInput, loginSchema } from '@/types/auth.dto';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      router.push('/');
    } catch {
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <div className="flex h-full flex-col px-10">
      <div className="mt-8 mb-15 flex items-center">
        <Back href="/" />
        <h1 className="text-headline-03 text-grayscale-00-black mx-auto">Login</h1>
      </div>
      <div className="flex flex-col gap-4">
        <InputForm label="ID" name="identifier" register={register} error={errors.identifier} />
        <InputForm label="Password" name="password" type="password" register={register} error={errors.password} />
      </div>
      <div className="absolute inset-x-10 top-3/4">
        <Button text="Login" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
}
