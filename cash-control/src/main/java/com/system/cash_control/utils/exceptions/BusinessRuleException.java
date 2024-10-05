package com.system.cash_control.utils.exceptions;

import com.system.cash_control.utils.MessageUtil;

public class BusinessRuleException extends Exception {

    public BusinessRuleException(String code) {
        super(MessageUtil.getMessage(code));
    }
}
