package com.ems.setup;

import com.ems.database.models.Manager;
import org.bson.types.ObjectId;

import java.util.List;

public class DemoManagers {

    public static Manager DEMO_MANAGER_ONE = new Manager(
            new ObjectId("651f4001631f63367d896197"),
            "Jane",
            "Doe",
            "jdoe@gmail.com",
            "111-111-1111",
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId()),
            List.of("Guard"));

    public static Manager DEMO_MANAGER_TWO = new Manager(
            new ObjectId("653d70c730cd4ad7a58ee7fb"),
            "Admin",
            "Manager",
            "manager@gmail.com",
            "111-111-1111",
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId(),DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(1).getLocationId()),
            List.of("Guard"));

    public static List<Manager> createDemoManagerList(){
        return List.of(DEMO_MANAGER_ONE, DEMO_MANAGER_TWO);
    }
}
