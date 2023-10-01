package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtils {

    public static Object[] convertJSONToManagerAndObjectId(final JSONObject pRequestBody) throws SvcException {
        try {
            String managerId = pRequestBody.optString("managerId");
            String objectId = pRequestBody.optString("objectId");

            if (managerId.isEmpty() || objectId.isEmpty()) {
                throw new IllegalArgumentException("managerId or objectId is empty or not present in JSON");
            }

            ObjectId managerObjectId = new ObjectId(managerId);
            ObjectId objectObjectId = new ObjectId(objectId);

            return new Object[]{managerObjectId, objectObjectId};
        } catch (JSONException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new SvcException("Error converting JSON to manager and objectId");
        }
    }
}
