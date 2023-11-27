package com.ems.Utils;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

public class SuccessfulResponseUtils {

    public static ResponseEntity successfulResponse(final String pMessage){
        try{
            JSONObject response = new JSONObject();
            response.put("message", pMessage);
            return ResponseEntity.status(200).body(response.toString());
        }
        catch (Exception e){
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }
}
