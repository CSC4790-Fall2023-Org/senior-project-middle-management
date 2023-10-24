package com.ems.Utils;

import com.ems.Exceptions.SvcException;

import java.time.LocalDate;

public class ValidationUtils {

    public static void validateDate(final int pYear, final int pMonth, final int pDay) throws SvcException {
        if (pYear < LocalDate.now().getYear()){
            throw new SvcException("year is invalid");
        }

        if (pMonth > 12 || pMonth < 1){
            throw new SvcException("month is invalid");
        }

        if (pDay > LocalDate.of(pYear, pMonth, 1).lengthOfMonth() || pDay < 1){
            throw new SvcException("day is invalid");
        }
    }
}
