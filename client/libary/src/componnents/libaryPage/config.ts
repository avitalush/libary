import { LibBookInformation, LibPublisher } from "../../interfaces";

export const buttonsConfig = (
  card: LibBookInformation,
  handleOpenPublisher: (publisher: LibPublisher) => void,
  handleCopies: (id: number) => void,
  handleAddClick: (card: LibBookInformation) => void,
  handleTaken: (id: number) => void
) => {
  const buttons = [
    { label: 'Publisher', onClick: () => handleOpenPublisher(card.publisher) },
    { label: 'Copies', onClick: () => handleCopies(card.id) },
    { label: 'Add', onClick: () => handleAddClick(card) },
    { label: 'Delete', onClick: () => handleAddClick(card) },
  ];

  if (card.is_available) {
    buttons.push({ label: 'Take', onClick: () => handleTaken(card.id) });
  }

  return buttons;
};
export const cardFields = [
  { label: 'Name', key: 'name' as keyof LibBookInformation },
  { label: 'Author', key: 'author' as keyof LibBookInformation },
  { label: 'Publication year', key: 'publication_year' as keyof LibBookInformation }
];

