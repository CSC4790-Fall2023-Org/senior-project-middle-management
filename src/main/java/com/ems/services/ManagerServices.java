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

    public static ResponseEntity deleteManager(final String pPayload) {
        Manager manager;
        ObjectId managerId;
        try {
            managerId = JsonUtils.getManagerIdFromJSON(new JSONObject(pPayload));
        } catch (SvcException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            manager = DatabaseServices.findManagerById(managerId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_MANAGER, managerId));
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            ValidationServices.validateDeleteManager(manager);
        } catch (SvcException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        DatabaseServices.deleteManager(manager);
        return ResponseEntity.status(200).body("Manager deleted successfully");
    }

}
