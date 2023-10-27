package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.*;
import com.ems.database.models.*;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ShiftServices {
    public static ResponseEntity createShift(String pPayload) {
        try{
            // create shift and get occurences
            Object[] shiftInfo = JsonUtils.getShiftFromJSON(new JSONObject(pPayload));
            final Shift shiftToBeSaved = (Shift) shiftInfo[0];
            final int occurences = (int) shiftInfo[1];

            // validate shift information
            ValidationServices.validateCreateShift(shiftToBeSaved);

            //save shift to db
            for (int shiftOccurence = 0; shiftOccurence < occurences; shiftOccurence++){
                DatabaseServices.saveShift(shiftToBeSaved);
            }
        } catch (SvcException | JSONException | DatabaseException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Shift created successfully");
    }

    public static ResponseEntity createShifts(final String pPayload){
        try{
            // create shift helper from JSON
            final ShiftHelper shiftHelper = new ShiftHelper(new JSONObject(pPayload));

            // validate shift helper
            ValidationUtils.validateShiftHelper(shiftHelper);

            // create shifts from shift helper
            List<Shift> shiftList = ShiftUtils.createShifts(shiftHelper);

            // save shift list
            DatabaseUtils.saveShiftsFromList(shiftList);
        }
        catch (Exception e){
            try {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("message", jsonObject.toString());
                return ResponseEntity.status(400).body(e.getMessage());
            } catch (JSONException ex) {
                return ResponseEntity.status(400).body(ex.getMessage());
            }
        }
        return ResponseEntity.status(200).body("Shifts created successfully");
    }


    public static ResponseEntity deleteAllShifts(final String pPayload){
        try{
            final JSONObject request = new JSONObject(pPayload);
            final String pass = request.getString("pass");
            if (!pass.equals("delete")){
                return ResponseEntity.status(500).body("invalid password to delete all shifts");
            }
            DatabaseUtils.deleteAllShifts();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(200).body("all shifts deleted");
    }

    public static ResponseEntity getShiftCreationInfo(final String pPayload){
        try{
            final ObjectId managerId = JsonUtils.getManagerIdFromJSON(new JSONObject(pPayload));
            final Manager manager = DatabaseServices.findManagerById(managerId).orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_MANAGER, managerId));
            final Organization organization = DatabaseServices.findOrganizationById(manager.getOrganizationId()).orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, manager.getOrganizationId()));
            final List<Location> locationList = LocationUtils.getLocationListFromLocationIdList(manager.getLocationIdList(), organization);

            final JSONObject response = ResponseUtils.getLocationIdListAndShiftTypeListFromManager(manager.getShiftTypeList(), locationList);
            return ResponseEntity.status(200).body(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
