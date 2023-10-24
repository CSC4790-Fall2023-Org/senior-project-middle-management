package com.ems.TestFactory;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonTestFactory {
    public static JSONObject getShiftHelperJson()  {
        try {
            JSONObject shiftHelperJson = new JSONObject();
            shiftHelperJson.put("startDate", "2023/01/01");
            shiftHelperJson.put("endDate", "2023/01/31");
            shiftHelperJson.put("startHour", 10);
            shiftHelperJson.put("startMinute", 0);
            shiftHelperJson.put("isStartAM", true);
            shiftHelperJson.put("endHour", 3);
            shiftHelperJson.put("endMinute", 0);
            shiftHelperJson.put("isEndAM", false);
            return shiftHelperJson;

        } catch (JSONException e) {
            return new JSONObject();
        }

    }
}
