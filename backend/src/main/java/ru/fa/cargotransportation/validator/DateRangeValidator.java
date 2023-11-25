package ru.fa.cargotransportation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ru.fa.cargotransportation.annotation.ValidDateRange;
import ru.fa.cargotransportation.model.Cargo;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, Cargo> {

    private String message;

    @Override
    public void initialize(ValidDateRange constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Cargo cargo, ConstraintValidatorContext constraintValidatorContext) {

        boolean isValid = !cargo.getArrivalDate().isBefore(cargo.getDepartureDate());

        if (!isValid) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        }

        return isValid;
    }
}
