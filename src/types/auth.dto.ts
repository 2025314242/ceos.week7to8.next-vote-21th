import { z } from 'zod';

export const PART_LABELS = ['BACKEND', 'FRONTEND'] as const;

export const TEAM_LABELS = ['PROMESA', 'LOOPZ', 'INFLUY', 'HANIHOME', 'DEARDREAM'] as const;

export const loginSchema = z.object({
  identifier: z.string().min(1, '아이디를 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});

export const signUpSchema = loginSchema
  .extend({
    name: z.string().min(1, '이름을 입력하세요.'),
    confirmPassword: z.string(),
    email: z.string().email('유효한 이메일을 입력하세요.'),
    part: z.enum(PART_LABELS, {
      errorMap: () => ({ message: '파트를 선택하세요.' }),
    }),
    team: z.enum(TEAM_LABELS, {
      errorMap: () => ({ message: '팀을 선택하세요.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignUpRequest = Omit<SignUpInput, 'confirmPassword'>;
