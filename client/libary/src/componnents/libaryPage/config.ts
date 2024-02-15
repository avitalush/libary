import { LibBookInformation, LibPublisher } from '../../interfaces'

export const buttonsConfig = (
  card: LibBookInformation,
  handleOpenPublisher: (publisher: LibPublisher) => void,
  handleCopies: (id: string) => void,
  handleAddClick: (card: LibBookInformation) => void,
  handleTaken: (id: string) => void,
  handleDeleteClick: (id: string) => void,
) => {
  const buttons = [
    { label: 'Publisher', onClick: () => handleOpenPublisher(card.publisher) },
    { label: 'Copies', onClick: () => handleCopies(card.id) },
    { label: 'Add', onClick: () => handleAddClick(card) },
    { label: 'Delete', onClick: () => handleDeleteClick(card.id) },
  ]

  if (card.isAvailable) {
    buttons.push({ label: 'Take', onClick: () => handleTaken(card.id) })
  }

  return buttons
}
export const cardFields = [
  { label: 'Name', key: 'name' as keyof LibBookInformation },
  { label: 'Author', key: 'author' as keyof LibBookInformation },
  {
    label: 'Publication year',
    key: 'publicationYear' as keyof LibBookInformation,
  },
]
