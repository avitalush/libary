import BookInformationRepository from "../repositories/libBookInformation.repository";
import PublisherRepository from "../repositories/libPublisher.repository";
import { LibPublisher } from "../types";

const PublisherService = {
  all: () => PublisherRepository.findAll(),
  create: (publisher: LibPublisher) => PublisherRepository.add(publisher),
  getReportData: () => BookInformationRepository.calculatePublisherPayments(),
  delete: (publisherID: string) => PublisherRepository.delete(publisherID),
};

export default PublisherService;
