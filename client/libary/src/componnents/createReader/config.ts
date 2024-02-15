import * as yup from 'yup'

export const schema = yup
  .object({
    firstName: yup.string().required('שדה זה חובה').min(2, 'השם אינו תקין'),
    lastName: yup.string().required('שדה זה חובה').min(2, 'השם אינו תקין'),
    birthDate: yup
      .date()
      .required('שדה זה חובה')
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        'התאריך המקסימלי הוא שנה פחות מהתאריך הנוכחי',
      ),
  })
  .required()
