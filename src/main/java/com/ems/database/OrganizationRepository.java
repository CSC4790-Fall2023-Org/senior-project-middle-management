package com.ems.database;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "organizations")
public interface OrganizationRepository extends MongoRepository<Organization, String>{

}
