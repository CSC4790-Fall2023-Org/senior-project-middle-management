package com.ems.database.repositories;

import com.ems.database.models.Location;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "locations")
public interface LocationRepository extends MongoRepository<Location, String> {
}
