package com.ems.Utils;

import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.database.models.ShiftHelper;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class ShiftUtils {
    public static Shift getBaseShift(){
        return new Shift(
                new ObjectId("6500e9ec491cac473a9b80cd"),
                LocationUtils.getBaseLocation().getLocationId(),
                "Guard Shift",
                LocalDateTime.of(2023, 8, 20, 10,0),
                LocalDateTime.of(2023, 8, 20, 18,0),
                "Guard",
                true,
                true);
    }


    public static List<LocalDate> getDatesBetweenTwoDates(final LocalDate pStartDate, final LocalDate pEndDate){
        List<LocalDate> dates = new ArrayList<>();

        for (LocalDate date = pStartDate; date.isBefore(pEndDate); date = date.plusDays(1)){
            dates.add(date);
        }
        dates.add(pEndDate);
        return dates;
    }

    public static List<LocalDate> removeUnwantedDaysOfTheWeek(final List<LocalDate> pDates, final List<Integer> pDaysOfWeek){
        List<LocalDate> dates = new ArrayList<>();
        for (LocalDate date : pDates){
            if (pDaysOfWeek.contains(date.getDayOfWeek().getValue())){
                dates.add(date);
            }
        }
        return dates;
    }

    public static List<LocalDate> removeUnwantedDatesBasedOnOccurrences(final List<LocalDate> pDateList, final int pOccurrences){
        List<LocalDate> dates = new ArrayList<>();
        if (pOccurrences == 0){
            // never
            return removeNever(pDateList);
        }
        else if (pOccurrences == 1){
            // weekly
            return pDateList;
        }
        else if (pOccurrences == 2){
            // biweekly
            return removeBiweekly(pDateList);
        }
        else{
            // monthly
            return removeMonthly(pDateList);
        }
    }

    public static List<LocalDate> removeBiweekly(List<LocalDate> pDateList){
        List<LocalDate> dates = new ArrayList<>();


        // get to first sunday
        HashSet<Integer> seen = new HashSet<>();
        for (LocalDate localDate : pDateList) {
            if (seen.contains(localDate.getDayOfWeek().getValue())){
                break;
            }
            if (localDate.getDayOfWeek().getValue() == 7) {
                pDateList.remove(localDate);
                dates.add(localDate);
                break;
            }
            dates.add(localDate);
            seen.add(localDate.getDayOfWeek().getValue());
        }

        // remove seen dates
        for (LocalDate date : dates){
            pDateList.remove(date);
        }

        seen.clear();
        boolean skipWeek = true;
        for (LocalDate date : pDateList) {
            if(seen.contains(date.getDayOfWeek().getValue())){
                skipWeek = !skipWeek;
                seen.clear();
            }
            seen.add(date.getDayOfWeek().getValue());
            if(skipWeek){
                continue;
            }

            dates.add(date);
        }

        return dates;
    }

    public static List<LocalDate> removeNever(final List<LocalDate> pDateList){
        List<LocalDate> dates = new ArrayList<>();
        HashSet<Integer> seen = new HashSet<>();

        for (LocalDate date : pDateList) {
            if(seen.contains(date.getDayOfWeek().getValue())){
                return dates;
            }
            seen.add(date.getDayOfWeek().getValue());
            dates.add(date);
        }
        return pDateList;
    }

    public static List<LocalDate> removeMonthly(final List<LocalDate> pDateList){
        List<LocalDate> dates = new ArrayList<>();
        HashSet<Integer> seen = new HashSet<>();
        int prevMonth = pDateList.get(0).getMonthValue();

        // get to first sunday
        for (LocalDate localDate : pDateList) {
            if (localDate.getDayOfWeek().getValue() == 7) {
                pDateList.remove(localDate);
                dates.add(localDate);
                break;
            }
            pDateList.remove(localDate);
            dates.add(localDate);
        }


        for(LocalDate date : pDateList){
            if (prevMonth == date.getMonthValue()){
                continue;
            }

            if(seen.contains(date.getDayOfWeek().getValue())){
                seen.clear();
                prevMonth = date.getMonthValue();
                continue;
            }
            seen.add(date.getDayOfWeek().getValue());
            dates.add(date);
        }
        return dates;
    }

    public static List<Shift> createListOfShiftsFromDateList(final List<LocalDate> pDateList, final ShiftHelper pShiftHelper){
        List<Shift> shifts = new ArrayList<>();
        for (LocalDate date : pDateList){
            for (int index = 0; index < pShiftHelper.getNumberOfShifts(); index++){
                shifts.add(new Shift(
                        new ObjectId(),
                        pShiftHelper.getLocationId(),
                        pShiftHelper.getShiftName(),
                        LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(), pShiftHelper.getStartHour(), pShiftHelper.getStartMinute()),
                        LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(), pShiftHelper.getEndHour(), pShiftHelper.getEndMinute()),
                        pShiftHelper.getShiftType(),
                        true,
                        true));
            }
        }
        return shifts;
    }

    public static List<Shift> createShifts(final ShiftHelper pShiftHelper){
        List<LocalDate> dates = getDatesBetweenTwoDates(pShiftHelper.getStartDate(), pShiftHelper.getEndDate());
        dates = removeUnwantedDaysOfTheWeek(dates, pShiftHelper.getDaysOfWeek());
        dates = removeUnwantedDatesBasedOnOccurrences(dates, pShiftHelper.getRepeatsEvery());
        return createListOfShiftsFromDateList(dates, pShiftHelper);
    }

    public static List<Shift> getAvailableShiftsForEmployee(final Employee pEmployee, final Organization pOrganization, final List<Shift> pShiftList){
        List<Shift> availableShifts = new ArrayList<>();
        ArrayList<Shift> seen = new ArrayList<>();
        for (Shift shift : pShiftList){
            if(ValidationUtils.validateShiftForEmployee(shift, pEmployee, pOrganization.getWeeksToReleaseShifts(), seen)){
                availableShifts.add(shift);
                seen.add(shift);
            }
        }
        return availableShifts;
    }

    public static List<Shift> getClaimedShiftsList(List<ObjectId> claimedShifts, List<Shift> shiftList) {
        List<Shift> claimedShiftsList = new ArrayList<>();
        for (Shift shift : shiftList){
            if (claimedShifts.contains(shift.getShiftId()) && ValidationUtils.validateClaimedShiftForEmployee(shift)){
                claimedShiftsList.add(shift);
            }
        }
        return claimedShiftsList;
    }
}
