package ru.fa.cargotransportation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ru.fa.cargotransportation.validator.DateRangeValidator;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateRangeValidator.class)
@Documented
public @interface ValidDateRange {

    String message() default "Invalid date range. Arrival date must be after departure date";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
