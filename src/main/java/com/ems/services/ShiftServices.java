package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import com.ems.database.models.Shift;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ValidationUtils;

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

}
