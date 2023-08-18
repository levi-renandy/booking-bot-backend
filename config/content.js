let isLoaded = true;
let cursor;

let slotEl = document.querySelector("table#displaySlot tbody tr a");
let returnEl = document.querySelector("a.laquo.largetext.bold");
if (
  slotEl &&
  document.querySelectorAll("#orderSideBar table tbody tr").length < 11
) {
  slotEl.addEventListener("click", () => {
    chrome.runtime.sendMessage({ newSlotBooked: true });
  });

  slotEl.click();
} else if (returnEl) {
  returnEl.click();
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.searchAvailableDays) {
    try {
      let [, endDate] = getDateRange();
      await sleep(200);
      if (isOver2Months(endDate)) {
        document
          .getElementById("searchForWeeklySlotsPreviousAvailable")
          .click();
      } else {
        document.getElementById("searchForWeeklySlotsNextAvailable").click();
      }
      sendResponse(true);
    } catch (error) {
      sendResponse(false);
    }
  } else if (request.isLoaded) {
    sendResponse(cursor !== "wait" && isLoaded);
  }
});

const getSlots = (dayEl) => {
  const str = dayEl.children[0].innerHTML;
  const word1 = "</span>";
  const word2 = "<span";

  const regex = new RegExp(`${word1}(.*?)${word2}`);
  const result = str.match(regex);
  if (result && result.length > 1) {
    return Number(result[1]);
  }
  return 0;
};

document.addEventListener("mouseover", function (e) {
  cursor = e.target.style.cursor;
});

let detect = setInterval(() => {
  chrome.runtime.sendMessage({ getState: true }, (res) => {
    if (res) {
      let dialogs = document.querySelectorAll('div[role="dialog"]');

      for (let dialog of dialogs) {
        if (getComputedStyle(dialog).display !== "none") {
          dialog.querySelector('button[title="Close"]').click();
        }
      }

      let dayEls = document.getElementsByClassName("day slotsavailable");
      if (dayEls.length) {
        let [startDate, endDate] = getDateRange();

        let { el } = Array.from(dayEls).reduce(
          (prev, curr) => {
            if (
              isOver2Months(endDate) &&
              isOver2Months(getDate(curr, startDate))
            ) {
              return prev;
            }
            let currSlots = getSlots(curr);
            //   console.log(currSlots);
            if (prev.slots < currSlots) {
              return { slots: currSlots, el: curr };
            } else return prev;
          },
          { el: null, slots: 0 }
        );
        if (el) {
          el.querySelector("a").click();
          clearInterval(detect);
        }
      }
    }
  });
}, 100);

const isOver2Months = (date) => {
  const now = new Date();
  return date > new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
};

const strToDate = (str) => {
  let dateStr = str.split(" ");
  return new Date(`${dateStr[1]} ${parseInt(dateStr[0])}, ${dateStr[2]}`);
};

const getDateRange = () => {
  let [startStr, endStr] = document
    .querySelector("#searchResults p.centre.bold")
    .innerText.split(" – ");
  return [strToDate(startStr), strToDate(endStr)];
};

const getDate = (el, startDate) => {
  return new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + getDayNumber(el.getAttribute("headers"))
  );
};

const getDayNumber = (dayStr) => {
  return {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  }[dayStr];
};
