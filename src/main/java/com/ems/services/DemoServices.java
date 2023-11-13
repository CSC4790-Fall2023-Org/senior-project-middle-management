package com.ems.services;

import com.ems.Utils.DatabaseUtils;
import org.bson.json.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public class DemoServices {

    public static ResponseEntity clearAllDatabases(@RequestBody String pPayload){
        try{
            final JSONObject request = new JSONObject(pPayload);
            final String pass = request.getString("pass");
            if (!pass.equals("delete")){
                return ResponseEntity.status(500).body("invalid password to delete all shifts");
            }
            DatabaseUtils.deleteAllShifts();


        } catch (Exception e) {
            return ResponseEntity.status(400).body("error deleting");
        }
        return ResponseEntity.status(200).body("database successfully cleared");
    }
}
