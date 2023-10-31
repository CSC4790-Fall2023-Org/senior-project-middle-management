package com.ems.setup;

import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import org.bson.types.ObjectId;

import java.util.List;

public class DemoOrganizations {

    public static Organization DEMO_ORG_ONE = new Organization(
            new ObjectId("6500e97e491cac473a9b80c8"),
            "Town Pool",
            "orgowner@gmail.com",
            List.of(new Location(
                    new ObjectId("6500e97e491cac473a9b80c9"),
                    "Town Pool",
                    40), new Location(new ObjectId("6500e97e491cac473a9b80c7"), "Town Park", 40)),
            2);

    public static List<Organization> createDemoOrganizationList(){
        return List.of(DEMO_ORG_ONE);
    }
}
