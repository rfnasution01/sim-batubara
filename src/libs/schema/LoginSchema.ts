import zod from 'zod'

export const LoginSchema = zod.object({
  username: zod.string({
    required_error: 'Username harus di isi',
    invalid_type_error: 'Format username tidak valid',
  }),
  password: zod.string({
    required_error: 'Password harus di isi',
    invalid_type_error: 'Format password tidak valid',
  }),
  hasil: zod.string({
    required_error: 'Hasil harus di isi',
    invalid_type_error: 'Format hasil tidak valid',
  }),
})
