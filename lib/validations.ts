import { z } from "zod";
export const SignInScheam = z.object({
  email: z
    .string()
    .min(1, { message: "Email alanı gereklidir" })
    .email({ message: "Lütfen geçerli bir mail adresi belirtin" }),

  password: z
    .string()
    .min(6, { message: "Şifreniz en az 6 karakter olmalıdır" })
    .max(100, { message: "Şifreniz 100 karakteri aşamaz" })
    .regex(/[A-Z]/, {
      message: "Şifreniz en az bir büyük harf içermelidir",
    })
    .regex(/[a-z]/, {
      message: "Şifreniz en az bir küçük harf içermelidir",
    })
    .regex(/[0-9]/, { message: "Şifreniz en az bir rakam içermelidir" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Şifreniz en az bir özel karakter içermelidir",
    }),
});

export const SignUpScheam = z.object({
  email: z
    .string()
    .min(1, { message: "Email alanı gereklidir" })
    .email({ message: "Lütfen geçerli bir mail adresi belirtin" }),

  password: z
    .string()
    .min(6, { message: "Şifreniz en az 6 karakter olmalıdır" })
    .max(100, { message: "Şifreniz 100 karakteri aşamaz" })
    .regex(/[A-Z]/, {
      message: "Şifreniz en az bir büyük harf içermelidir",
    })
    .regex(/[a-z]/, {
      message: "Şifreniz en az bir küçük harf içermelidir",
    })
    .regex(/[0-9]/, { message: "Şifreniz en az bir rakam içermelidir" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Şifreniz en az bir özel karakter içermelidir",
    }),

  username: z
    .string()
    .min(3, { message: "Kullanıcı ismi en az 3 karakter olmalıdır" })
    .max(30, { message: "Kullanıcı ismi 30 karakteri geçemez" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Kullanıcı ismi sadece karakterler, rakamlar ve alt çizgi karakteri içerebilir",
    }),

  name: z
    .string()
    .min(1, { message: "İsim alanı gereklidir" })
    .max(50, { message: "İsim alanı 50 karakteri aşamaz" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "İsim alanı sadece karakter ve boşluklardan oluşabilir",
    }),
});
