package com.ems.Utils;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Manager;
import com.ems.database.models.Organization;
import com.ems.services.DatabaseServices;
import com.ems.services.ValidationServices;
import org.bson.types.ObjectId;

import java.util.List;

public class ManagerUtils {

    public static Manager getBaseManager() {
        return new Manager(
                new ObjectId("6500e9cc491cac473a9b80cb"),
                "manager",
                "admin",
                "madmin@gmail.com",
                "111-111-1111",
                new ObjectId("6500cf35491cac473a9b80c8"),
                List.of(LocationUtils.getBaseLocation().getLocationId())
        );
    }

    public static boolean doManagersMatch(final Manager pManager, final Manager pComparisonManager) {
        return pManager.getFirstName().equals(pComparisonManager.getFirstName())
                && pManager.getLastName().equals(pComparisonManager.getLastName())
                && pManager.getManagerEmail().equals(pComparisonManager.getManagerEmail())
                && pManager.getManagerPhoneNumber().equals(pComparisonManager.getManagerPhoneNumber())
                && pManager.getOrganizationId().equals(pComparisonManager.getOrganizationId());
    }

    public static Object[] assignManagerToOrganizationUsingObjects(final Manager pManager, final Organization pOrganization) throws SvcException {
        // validation
        ValidationServices.validateManagerCanJoinOrganization(pManager, pOrganization);

        // assign the manager to the organization
        pManager.setOrganizationId(pOrganization.getOrganizationId());
        return new Object[]{pManager, pOrganization};
    }
}
