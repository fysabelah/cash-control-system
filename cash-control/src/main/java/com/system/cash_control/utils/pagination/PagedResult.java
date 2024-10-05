package com.system.cash_control.utils.pagination;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PagedResult<T> {

    private Pagination pagination;

    private List<T> data;
}