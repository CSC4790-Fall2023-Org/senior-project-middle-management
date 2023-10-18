package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import com.ems.database.models.Manager;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

public class ManagerServices {

    public static ResponseEntity createManager(final String pPayload) {
        Manager manager;
        try {
            manager = JsonUtils.getManagerFromJSON(new JSONObject(pPayload));
        } catch (SvcException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            ValidationServices.validateCreateManager(manager);
        } catch (SvcException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            DatabaseServices.saveManager(manager);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        return ResponseEntity.status(200).body("Manager created successfully");
    }

    public static ResponseEntity deleteManager(String pPayload) {
        try {
            Manager manager;
            ObjectId managerId;

            //parse the managerId from the JSON payload
            managerId = JsonUtils.getManagerIdFromJSON(new JSONObject(pPayload));

            //find the manager by ID in the database
            manager = DatabaseServices.findManagerById(managerId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_MANAGER, managerId));

            // validate the manager deletion
            ValidationServices.validateDeleteManager(manager);

            DatabaseServices.deleteManager(manager);

        } catch (SvcException | JSONException | DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        //manager deletion is successful
        return ResponseEntity.status(200).body("Manager deleted successfully");
    }
}
