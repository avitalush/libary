import * as yup from 'yup'
export const schema = yup
  .object({
    name: yup.string().required('שדה זה חובה').min(2, 'השם אינו תקין'),
    author: yup.string().required('שדה זה חובה').min(2, 'השם אינו תקין'),
    publicationYear: yup
      .number()
      .required('שדה זה חובה')
      .integer('השנה אינה תקינה')
      .min(1900, 'השנה אינה תקינה')
      .max(2100, 'השנה אינה תקינה'),
    price: yup
      .number()
      .required('שדה זה חובה')
      .integer('המחיר אינו תקין')
      .min(0, 'המחיר חייב להיות לא משלים'),
    numOfCopies: yup
      .number()
      .required('שדה זה חובה')
      .integer('מספר העותקים אינו תקין')
      .min(1, 'מספר העותקים חייב להיות לפחות 1'),
    publisher: yup.object().required('שדה זה חובה'),
  })
  .required()

export const fieldsForm = [
  { nameField: 'name', typeField: 'text' },
  { nameField: 'author', typeField: 'text' },
  { nameField: 'publicationYear', typeField: 'number' },
  { nameField: 'numOfCopies', typeField: 'number' },
  { nameField: 'price', typeField: 'number' },
  { nameField: 'publisher', typeField: 'select' },
]
