package com.ems.database.repositories;


import com.ems.database.models.Manager;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "managers")
public interface ManagerRepository extends MongoRepository<Manager, String> {

}
