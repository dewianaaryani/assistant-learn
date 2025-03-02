import { useRef } from "react";
import { useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import { CalendarDate } from "@internationalized/date";

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currrentMonth: CalendarDate;
}) {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return <td {...cellProps} className={`py-0.5 px-0.5 relative `}></td>;
}
