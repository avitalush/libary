import {NextFunction, Request, Response} from "express";
import { allpublishers, createpublisher, deletePublisher, reportData } from "../repositories/libPublisher.repository";
import { LibPublisher } from "../types";
import { calculatePublisherPayments } from "../repositories/libBookInformation.repository";




  export const all= () =>allpublishers();


  export const create= (publisher:LibPublisher) =>createpublisher(publisher);
 
  

  export const getReportData= () =>calculatePublisherPayments();

  export const deletePublishers=(publisherID:number)=>deletePublisher(publisherID);
 
     




