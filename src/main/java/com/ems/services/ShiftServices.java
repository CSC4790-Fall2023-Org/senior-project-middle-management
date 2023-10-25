package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.DatabaseUtils;
import com.ems.Utils.JsonUtils;
import com.ems.Utils.ShiftUtils;
import com.ems.Utils.ValidationUtils;
import com.ems.database.models.Shift;
import com.ems.database.models.ShiftHelper;
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
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Shifts created successfully");
    }

}
