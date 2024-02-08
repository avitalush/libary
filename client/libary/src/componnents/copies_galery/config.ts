import { LibBorrowing } from "../../interfaces";

export const cardInfoConfig = [
    { label: "Code", key: "id", transform: (id:number) => `#${String(id).substring(0, 4)}` },
    { label: "Number of Borrowings", key: "borrowings", transform: (borrowings:LibBorrowing[]) => borrowings?.length || 0 },
    { label: "Is Taken?", key: "is_taken", transform: (is_taken:boolean) => is_taken ? 'Yes' : 'No' }
  ];
  