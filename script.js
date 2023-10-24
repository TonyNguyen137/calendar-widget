import { $, $$ } from './helpers.js';

const daysContainer = $('.calendar__daysContainer');
const nextBtn = $('.calendar__nextBtn');
const prevBtn = $('.calendar__prevBtn');
const todayBtn = $('.calendar__todayBtn');
const selectMonths = $('.calendar__selectMonths');
const currentMonthEl = $('.date__currentMonth');
const currentYearEl = $('.date__currentYear');
const timeFromInp = $('#time-from');
const timeToInp = $('#time-to');
const dateFromInp = $('#date-from');
const dateToInp = $('#date-to');
const titleInp = $('#title');
const excerptInp = $('#excerpt');
const imageInp = $('#image-data');

const fakeData = [
  {
    year: '2023',
    month: 9,
    day: 24,
    timeFrom: '10',
    timeTo: '12',
    title: 'Wordpress for Beginners',
    excerpt: 'ahahahahha',
    imageLink:
      'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  },

  {
    year: '2023',
    month: 9,
    day: 24,
    timeFrom: '15',
    timeTo: '17',
    title: 'Friday Night Dance Party',
    excerpt: 'lorem ipsum 2',
    imageLink: null,
  },

  {
    year: '2023',
    month: 10,
    day: 26,
    timeFrom: '10',
    timeTo: '12',
    title: 'Winter Renaissance Fair',
    excerpt: 'lorem ipsum 3',
    imageLink: null,
  },

  {
    year: '2023',
    month: 9,
    day: 24,
    timeFrom: '18',
    timeTo: '19',
    title: 'Waffles with friends',
    excerpt: 'lorem ipsum 3',
    imageLink: null,
  },

  {
    year: '2023',
    month: 9,
    day: 24,
    timeFrom: '13',
    timeTo: '14',
    title: 'Lil Sebastian Fundraiser',
    excerpt: 'lorem ipsum 2',
    imageLink: null,
  },

  {
    year: '2023',
    month: 9,
    day: 29,
    timeFrom: '14',
    timeTo: '17',
    title: 'Restaurant Association Mixer',
    excerpt: 'lorem ipsum 2',
    imageLink: null,
  },

  {
    year: '2023',
    month: 9,
    day: 29,
    timeFrom: '10',
    timeTo: '16',
    title: 'Central Park Ribbon Cutting',
    excerpt: 'lorem ipsum 2',
    imageLink: null,
  },

  {
    year: '2023',
    month: 10,
    day: 2,
    timeFrom: '10',
    timeTo: '12',
    title: 'Ramen essen hoch 2',
    excerpt: 'lorem ipsum 2',
    imageLink: null,
  },

  {
    year: '2023',
    month: 11,
    day: 15,
    timeFrom: '10',
    timeTo: '12',
    title: 'Sushi Restaurant Besuch',
    excerpt: 'lorem ipsum 2',
    imageLink: 'https://picsum.photos/seed/picsum/200/300',
  },
];

const submitBtn = $('.submit');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(dateFromInp.value);
  console.log(dateToInp.value);
  console.log(titleInp.value);
  console.log(excerptInp.value);
  console.log(imageInp.value);
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// get current date
const date = new Date();
console.log('date: ', date);

// get current month as Integer 0 - 11
let currentMonth = date.getMonth();
console.log('currentMonth: ', currentMonth);

// get current year
let currentYear = date.getFullYear();
console.log('currentYear: ', currentYear);

// function to render days
function renderCalendar() {
  // set the first day of the current Date
  date.setDate(1);
  console.log('setDate(1): ', date);

  //determine the first day of current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  console.log('firstDay: ', firstDay);
  console.log('firstDay.getDate: ', firstDay.getDate());
  console.log('firstDay.getDay: ', firstDay.getDay());

  //determine the last day of current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  console.log('lastDay: ', lastDay);

  // returns an Integer between 0 - 6
  //Sunday = 0; Monday = 1, Tuesday = 2.....
  const lastDayIndex = lastDay.getDay();
  console.log('lastDay.getDay: ', lastDayIndex);
  const lastDayDate = lastDay.getDate();
  console.log('lastDay.getDate: ', lastDayDate);

  //days from last Month
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  console.log('prevLastDay: ', prevLastDay);

  const prevLastDayDate = prevLastDay.getDate();
  console.log('prevLast.getDate: ', prevLastDayDate);

  // days from next Month
  const nextDays = 7 - (lastDayIndex + 1);
  console.log('nextDays: ', nextDays);

  // display current Month
  selectMonths.selectedIndex = currentMonth;
  currentMonthEl.textContent = months[currentMonth];
  currentYearEl.textContent = currentYear;

  // update days html
  let days = '';

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    console.log('prev CurrentMonth', currentMonth);

    const eventContainer = fetchEvent(
      fakeData,
      prevLastDayDate - x + 1,
      currentMonth,
      currentYear
    ).sort((a, b) => {
      return a.timeFrom - b.timeTo;
    });
    console.log('day', x);

    console.log('prev', eventContainer);

    if (eventContainer.length !== 0) {
      let container = `
        <div class="event-container">
        ${eventContainer
          .map((event) => {
            return `
            <div class="event">
            ${
              event.imageLink
                ? `<img
              src="${event.imageLink}
            "
              alt=""
            />`
                : ''
            }
              <p class="event__time">
                <time>${event.timeFrom} </time> - <time>${event.timeTo}</time>
              </p>
              <h3 class="event__title">${event.title}</h3>
            </div>
          `;
          })
          .join('')}
        
        </div>`;

      days += `
      <div class="calendar__cell notCurrentMonth">
        <span class="calendar__day">${prevLastDayDate - x + 1}</span>
        ${container}
      </div>
        `;
    } else {
      days += `
      <div class="calendar__cell notCurrentMonth">
        <span class="calendar__day">${prevLastDayDate - x + 1}</span>
      </div>
      
      `;
    }
  }

  function fetchEvent(data, i, currentMonth, currentYear) {
    const eventContainer = data.filter(
      (event) =>
        Number(event.day) === i &&
        Number(event.month) === currentMonth &&
        Number(event.year) === currentYear
    );

    return eventContainer;
  }
  function renderEvent(data, day, currentMonth, currentYear) {
    return data.map((event) => event[currentYear]);
  }

  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      //check for Event
      const eventContainer = fetchEvent(
        fakeData,
        i,
        currentMonth,
        currentYear
      ).sort((a, b) => {
        return a.timeFrom - b.timeTo;
      });
      console.log(eventContainer);

      if (eventContainer.length !== 0) {
        let container = `
        <div class="event-container">
        ${eventContainer
          .map((event) => {
            return `
            <div class="event">
            ${
              event.imageLink
                ? `<img
              src="${event.imageLink}
            "
              alt=""
            />`
                : ''
            }
              <p class="event__time">
                <time>${event.timeFrom} </time> - <time>${event.timeTo}</time>
              </p>
              <h3 class="event__title">${event.title}</h3>
            </div>
          `;
          })
          .join('')}
        
        </div>`;

        days += `
        <div class='calendar__cell currentDay'>
        <span class='calendar__day'>${i}</span>
        ${container}
        </div>
        `;
      } else {
        // if date month year matches add today
        days += `
        <div class='calendar__cell currentDay'>
        <span class='calendar__day'>${i}</span>
        </div>
        `;
      }
    } else {
      //else dont add today

      //check for Event
      const eventContainer = fetchEvent(
        fakeData,
        i,
        currentMonth,
        currentYear
      ).sort((a, b) => {
        return a.timeFrom - b.timeTo;
      });
      console.log(eventContainer.length);

      if (eventContainer.length !== 0) {
        let container = `
        <div class="event-container">
        ${eventContainer
          .map((event) => {
            return `
            <div class="event">
            ${
              event.imageLink
                ? `<img
              src="${event.imageLink}
            "
              alt=""
            />`
                : ''
            }
              <p class="event__time">
                <time>${event.timeFrom} </time> - <time>${event.timeTo}</time>
              </p>
              <h3 class="event__title">${event.title}</h3>
            </div>
          `;
          })
          .join('')}
        
        </div>`;

        days += `
        <div class='calendar__cell'>
        <span class='calendar__day'>${i}</span>
        ${container}
        </div>
        `;
      } else {
        // if date month year matches add today
        days += `
        <div class='calendar__cell'>
        <span class='calendar__day'>${i}</span>
        </div>
        `;
      }
    }
  }

  // next month days
  for (let j = 1; j <= nextDays; j++) {
    const eventContainer = fetchEvent(
      fakeData,
      j,
      currentMonth + 1,
      currentYear
    ).sort((a, b) => {
      return a.timeFrom - b.timeTo;
    });
    console.log('next: ', eventContainer);

    if (eventContainer.length !== 0) {
      let container = `
        <div class="event-container">
        ${eventContainer
          .map((event) => {
            return `
            <div class="event">
            ${
              event.imageLink
                ? `<img
              src="${event.imageLink}
            "
              alt=""
            />`
                : ''
            }
              <p class="event__time">
                <time>${event.timeFrom} </time> - <time>${event.timeTo}</time>
              </p>
              <h3 class="event__title">${event.title}</h3>
            </div>
          `;
          })
          .join('')}
        
        </div>`;

      days += `
        <div class='calendar__cell notCurrentMonth'>
        <span class='calendar__day'>${j}</span>
        ${container}
        </div>
        `;
    } else {
      days += `
      <div class="calendar__cell notCurrentMonth">
        <span class="calendar__day">${j}</span>
      </div>
      `;
    }
  }

  // run this function with every calendar render
  daysContainer.innerHTML = days;
}

renderCalendar();

const events = $$('.event');
const listPanel = $('.list-panel');
const closeBtn = $('.calendar__closeBtn');
const calendarHeadline = $('.calendar__headline');

const listHeadlineText =
  'Details zu den Termin in der Liste einfach anklicken!';
const calendarHeadlineText = 'Wählen Se einen Termin aus der Übersicht aus!';

events.forEach((event) => {
  event.addEventListener('click', () => {
    listPanel.classList.add('open');
    calendarHeadline.textContent = listHeadlineText;
  });
});

closeBtn.addEventListener('click', () => {
  if (listPanel.classList.contains('open')) {
    listPanel.classList.remove('open');
    calendarHeadline.textContent = calendarHeadlineText;
  }
});

nextBtn.addEventListener('click', () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener('click', () => {
  // increase by one
  currentMonth--;
  // check if month gets less than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener('click', () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});
