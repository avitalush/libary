import * as yup from 'yup';

export const schema = yup
  .object({
    first_name: yup.string().required("שדה זה חובה").min(2, "השם אינו תקין"),
    last_name: yup.string().required("שדה זה חובה").min(2, "השם אינו תקין"),
    birth_date: yup
      .date()
      .required("שדה זה חובה")
      .min(new Date("2000-01-01"), "התאריך המינימלי הוא 01/01/2000")
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), "התאריך המקסימלי הוא שנה פחות יומיים מהתאריך הנוכחי")
  })
  .required();
