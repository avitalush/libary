import { Lib_publisher } from "../entity/libPublisher.entity";
import { LibPublisher } from "../types";

export const allpublishers =  () => Lib_publisher.find();
   
export const createpublisher =  (publisher:LibPublisher) => Lib_publisher.save({
    name:publisher.name,
    address:publisher.address,
    email:publisher.email
}) 
 
export const reportData =  () => Lib_publisher.find({ relations: ["information_books"]}); 
  
export const deletePublisher = async (publisherID: number) => {

    const publisherToRemove = await Lib_publisher.findOneBy({id:publisherID});
   
    await Lib_publisher.remove(publisherToRemove);
};




