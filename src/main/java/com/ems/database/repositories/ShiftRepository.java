package com.ems.database.repositories;


import com.ems.database.models.Shift;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "shifts")
public interface ShiftRepository extends MongoRepository<Shift, String> {
}

