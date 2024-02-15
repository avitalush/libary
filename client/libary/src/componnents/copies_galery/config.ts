import { LibBook, LibBorrowing } from '../../interfaces'

export const cardInfoConfig: CardInfoItem[] = [
  {
    label: 'Code',
    key: 'id',
    transform: (id: string) => `#${id.substring(0, 4)}`,
  },
  {
    label: 'Number of Borrowings',
    key: 'borrowings',
    transform: (borrowings: LibBorrowing[]) => `${borrowings?.length || 0}`,
  },
  {
    label: 'Is Taken?',
    key: 'isTaken',
    transform: (isTaken: boolean) => (isTaken ? 'Yes' : 'No'),
  },
]

export interface CardInfoItem {
  label: string
  key: keyof LibBook
  transform: (value: any) => string
}
