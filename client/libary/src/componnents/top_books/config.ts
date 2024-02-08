import { DataGraph } from "../../interfaces";

function createData(
    bookName: string,
    count?: number | null
  ): { bookName: string; count: number | null } {
    const countNumber =
      typeof count === "number" ? count : count !== null ? parseInt(count || "0", 10) : null;
   console.log({bookName});
    return { bookName, count: countNumber };
  }
  
export const convertData = (data: DataGraph[]) => {
   
    
  const dataGraph = data.map((item: DataGraph) =>
    createData(item.bookName, item.count)
  );
  return dataGraph;
};
