import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup.string().required('שדה זה חובה').min(2, 'השם אינו תקין'),
    address: yup.string().required('שדה זה חובה').min(2, 'הכתובת אינה תקינה'),
    email: yup
      .string()
      .email('כתובת האימייל אינה חוקית')
      .required('שדה זה חובה'),
  })
  .required()
