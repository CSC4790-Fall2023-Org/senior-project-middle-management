package com.ems.Utils;

import com.ems.database.models.Organization;
import org.bson.types.ObjectId;

import java.util.List;

public class OrganizationUtils {

    public static Organization getBaseOrganization(){
        return new Organization(
                new ObjectId("6500cf35491cac473a9b80c8"),
                "Town Park",
                "townpark@gmail.com",
                List.of(LocationUtils.getBaseLocation()));
    }
}
