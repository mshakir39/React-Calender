import { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import { useOnClickOutside } from 'usehooks-ts';
import {
  FaPlus,
  FaMinus,
  FaAngleLeft,
  FaAngleRight,
  FaCaretDown,
  FaCaretUp,
} from 'react-icons/fa';
import {
  CalenderMainWrapper,
  CalenderInnerWrapper,
  DaysMainWrapper,
  HeaderMainWrapper,
  HeaderInnerWrapper,
  HeaderDaysWrapper,
  CellsMainWrapper,
  AddSubYear,
} from './styles';

interface ICalendar {
  getDate(a?: any): any;
}
export default function Calender({ getDate }: ICalendar) {
  const [isOpened, setisOpened] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [dateObject] = useState(moment);
  const [days, setDays] = useState();
  const weekDays = moment.weekdaysShort();
  const [nextmonth, setnextMonth] = useState(0);
  const [daysinMonths, setdaysinMonths] = useState(0);
  const [month, setmonth] = useState(Number(dateObject.format('M')));
  const [year, setyear] = useState(Number(dateObject.year()));
  const ref = useRef(null);

  const nextMonth = () => {
    if (month === 12) {
      setmonth(1);
      setyear((Prev) => Prev + 1);
    } else {
      setmonth((prevMonth) => prevMonth + 1);
    }

    setdaysinMonths(
      moment(
        `${year}-${month === 12 ? month : month + 1}`,
        'YYYY-MM'
      ).daysInMonth()
    );
  };

  const prevMonth = () => {
    if (month === 1) {
      setmonth(12);

      setyear((Prev) => Prev - 1);
    } else setmonth((prevMonth) => prevMonth - 1);

    setdaysinMonths(
      moment(
        `${year}-${month === 1 ? month : month - 1}`,
        'YYYY-MM'
      ).daysInMonth()
    );
  };

  useEffect(() => {
    setnextMonth((prev) => prev + 1);
  }, [month]);

  const firstDayOfMonth = () => {
    if (dateObject.month() == month - 1) {
      let firstDay = moment(dateObject).startOf('month').format('d');

      return Number(firstDay);
    } else {
      return moment(moment(dateObject, 'DD-MM-YYYY').add(nextmonth, 'M'))
        .startOf('month')
        .format('d');
    }
  };

  const currentDay = () => {
    return Number(dateObject.format('D'));
  };
  const onDateSelect = (day: any) => {
    if (getDate) {
      getDate(new Date(year, month - 1, day).toString());
    }

    setSelectedDate(
      day +
        ' ' +
        moment()
          .month(month - 1)
          .format('MMMM') +
        ' ' +
        year
    );
  };

  useEffect(() => {
    setSelectedDate(
      moment(dateObject).date() +
        ' ' +
        moment()
          .month(month - 1)
          .format('MMMM') +
        ' ' +
        year
    );
    setSelectedDay(moment(dateObject).date().toString());
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<td className='calendar-day empty'>{''}</td>);
    }

    let daysInMonth = [];
    let daysLength =
      daysinMonths !== 0 ? daysinMonths : dateObject.daysInMonth();

    for (let d = 1; d <= daysLength; d++) {
      let currentDaay: any =
        d == currentDay() &&
        Number(dateObject.format('M')) === month &&
        year === Number(dateObject.year())
          ? 'today'
          : '';

      daysInMonth.push(
        <td
          key={d}
          className={`${currentDaay}` + 'hasNumber'}
          onClick={() => {
            onDateSelect(d);
          }}
        >
          {d}
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [] as any;
    let cells = [] as any;

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }

      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d: any, i: any) => {
      return <tr key={i}>{d}</tr>;
    });
    setDays(daysinmonth);
  }, [month, year, selectedDay, nextmonth]);

  const handleClickOutside = () => {
    setisOpened(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickInside = () => {
    setisOpened(true);
  };

  return (
    <CalenderMainWrapper ref={ref} onClick={handleClickInside}>
      <div className='custom-wrapper'>
        <input
          type='text'
          readOnly
          value={selectedDate}
          style={{ textAlign: 'center' }}
        ></input>

        {isOpened ? <FaCaretUp /> : <FaCaretDown />}
      </div>

      {isOpened ? (
        <CalenderInnerWrapper>
          <>
            <HeaderMainWrapper>
              <HeaderInnerWrapper>
                <FaAngleLeft onClick={prevMonth} />
                <HeaderDaysWrapper>
                  <div>
                    {moment()
                      .month(month - 1)
                      .format('MMMM')}
                  </div>
                  <div>{year}</div>
                  <AddSubYear>
                    <FaPlus
                      onClick={() => {
                        setyear((Prev) => Prev + 1);
                      }}
                    />
                    <FaMinus
                      onClick={() => {
                        setyear((Prev) => Prev - 1);
                      }}
                    />
                  </AddSubYear>
                </HeaderDaysWrapper>
                <FaAngleRight onClick={nextMonth} />
              </HeaderInnerWrapper>
            </HeaderMainWrapper>
          </>
          <>
            <DaysMainWrapper>
              {weekDays.map((day, i) => (
                <td key={i}>{day}</td>
              ))}
            </DaysMainWrapper>
          </>
          <>
            <CellsMainWrapper>
              <table style={{ width: '-webkit-fill-available' }}>
                <tbody style={{ textAlign: 'center', lineHeight: '40px' }}>
                  {days}
                </tbody>
              </table>
            </CellsMainWrapper>
          </>
        </CalenderInnerWrapper>
      ) : null}
    </CalenderMainWrapper>
  );
}
