
const url = window.location.pathname;
const lastSlash = url.lastIndexOf('/');
const urlId = url.substr(lastSlash + 1);
const requestOpts = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
};

// getSecondsBetweenTwoTimes receives two Date objects
function getSecondsBetweenTwoTimes(start, end) {
  return (end.getTime() - start.getTime()) / 1000;
}

function buildGraph(statsObj) {
  console.log(statsObj);
  const timeTracks = statsObj.userTracker.map((obj) => obj.time);
  const lectureDurationInSeconds = getSecondsBetweenTwoTimes(new Date(timeTracks[0]),
    new Date(timeTracks[timeTracks.length - 1]));
  console.log(lectureDurationInSeconds);
}

fetch(`/lecture/stats/${urlId}`, requestOpts)
  .then((response) => {
    if (response.status === 200) {
      response.json().then((jsonResponse) => {
        buildGraph(jsonResponse);
      });
    }
    // else display error loading stats
  });

const products = [
  {
    time: 1,
    numStudent: 3,
  },
  {
    time: 2,
    numStudent: 4,
  },
  {
    time: 3,
    numStudent: 6,
  },
  {
    time: 4,
    numStudent: 7,
  },
  {
    time: 5,
    numStudent: 9,
  },
  {
    time: 6,
    numStudent: 8,
  },
  {
    time: 7,
    numStudent: 10,
  },
  {
    time: 8,
    numStudent: 14,
  },
  {
    time: 9,
    numStudent: 13,
  },
  {
    time: 10,
    numStudent: 14,
  },
  {
    time: 11,
    numStudent: 15,
  },
  {
    time: 15,
    numStudent: 14,
  },
  {
    time: 16,
    numStudent: 13,
  },
  {
    time: 19,
    numStudent: 15,
  },
  {
    time: 20,
    numStudent: 16,
  },
  {
    time: 21,
    numStudent: 17,
  },
  {
    time: 22,
    numStudent: 18,
  },
  {
    time: 23,
    numStudent: 19,
  },
  {
    time: 25,
    numStudent: 18,
  },
  {
    time: 27,
    numStudent: 0,
  },
  {
    time: 28,
    numStudent: 0,
  },
  {
    time: 30,
    numStudent: 0,
  },
];

const finalTime = products[products.length - 1].time;

const timeInterval = finalTime / 10;

const watchers = Array(10).fill(0);
const average = Array(10).fill(0);

for (var i = 0; i < products.length; i++) {
  const index = Math.floor(products[i].time / timeInterval);

  if (index <= (i + 1)) {
    watchers[index] += products[i].numStudent;
    average[index] += 1;
  }
}

console.log(watchers);
console.log(average);

const wat = [];

for (var i = 0; i < 10; i++) {
  if (watchers[i] === 0) {
    if (i == 0) {
      wat[i] = 0;
    } else if (average[i] === 0) {
      wat[i] = wat[i - 1];
    } else {
      wat[i] = 0;
    }
  } else {
    wat[i] = Math.ceil(watchers[i] / average[i]);
  }
}

const elem = document.getElementsByClassName('myBar');

const maxStudents = Math.max.apply(null, wat);

console.log(maxStudents);

for (let k = 0; k < 10; k++) {
  elem[k].style.height = `${(wat[k] / maxStudents) * 100}%`;
}
