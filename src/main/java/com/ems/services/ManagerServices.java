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
        ResponseEntity response = null;

        try {
            manager = JsonUtils.getManagerFromJSON(new JSONObject(pPayload));
            ValidationServices.validateCreateManager(manager);
            DatabaseServices.saveManager(manager);
            response = ResponseEntity.status(200).body("Manager created successfully");
        } catch (SvcException | JSONException | DatabaseException e) {
            e.printStackTrace();
            response = ResponseEntity.status(400).body(e.getMessage());
        }

        return response;
    }

    public static ResponseEntity deleteManager(final String pPayload) {
        Manager manager;
        ObjectId managerId;
        ResponseEntity response = null;

        try {
            managerId = JsonUtils.getManagerIdFromJSON(new JSONObject(pPayload));
            manager = DatabaseServices.findManagerById(managerId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_MANAGER, managerId));
            ValidationServices.validateDeleteManager(manager);
            response = ResponseEntity.status(200).body("Manager deleted successfully");
        } catch (SvcException | JSONException | DatabaseException e) {
            e.printStackTrace();
            response = ResponseEntity.status(400).body(e.getMessage());
        }

        return response;
    }
}
