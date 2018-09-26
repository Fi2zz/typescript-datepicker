import TypePicker from "./src/index";
import { source, languages as language } from "./test/mock";

export function hasClass(ele: any, className: string) {
  if (!ele) {
    return false;
  }
  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(ele.className);
}

export function addClass(ele: any, className: string) {
  if (!ele || hasClass(ele, className)) return;
  ele.className += (ele.className ? " " : "") + className;
}

const date = new Date();
const diff = TypePicker.diff;
const dateFormat = "YYYY-M-D";
const activeLanguageCode: string = "en-us";
const formControl = <HTMLInputElement>document.getElementById("date-value");
const activeLanguage = language[activeLanguageCode];

const dist = {
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate()
};
const currDate = new Date(dist.year, dist.month, dist.date);
const startDate = new Date(dist.year, dist.month, dist.date);
const endDate = new Date(dist.year, dist.month + 6, dist.date);
let options = {
  el: "#datepicker", // document.getElementById("datepicker"),
  startDate,
  endDate,
  limit: 7,
  format: dateFormat,
  selection: 2,
  views: 2
};

function createDatePicker(selected: Array<any>, options) {
  let app = null;

  app = new TypePicker(options);

  console.log(app);

  app.on("update", ({ value }: any) => {
    formControl.value = value;
  });
  app.on("disabled", (result: any) => {
    const { dateList, nodeList } = result;
    for (let n = 0; n < nodeList.length; n++) {
      let node = nodeList[n];
      // console.log(node.getAttribute("data-date"));
      let date = node.getAttribute("data-date");
      if (dateList.indexOf(date) >= 0) {
        node.classList.add("disabled");
      }
    }
  });
  app.on("data", (result: any) => {
    const data = result.data;
    const nodeList = result.nodeList;

    for (let i = 0; i < nodeList.length; i++) {
      let node = nodeList[i];
      let date = node.getAttribute("data-date");
      if (date in data) {
        // if (!hasClass(node, "disabled")) {
        let itemData = source[date];
        if (itemData.highlight) {
          // addClass(node, "highlight");
        }
        let placeholder: HTMLElement = node.querySelector(".placeholder");
        placeholder.innerHTML = itemData.value;
      }
      // } else {
      // addClass(node, "disabled");
      // }
    }
  });
  // app.on("ready", () => {
  //     let calendarHeaderTd = document.querySelectorAll("#calendar-header td");
  //     Array.prototype.slice.call(calendarHeaderTd).forEach(item => {
  //         item.addEventListener("click", () => {
  //             let data = item.dataset;
  //             app.emit("custom", {
  //                 type: "custom",
  //                 value: new Date(
  //                     parseInt(data.year),
  //                     parseInt(data.month) - 1,
  //                     currDate.getDate()
  //                 )
  //             });
  //         });
  //     });
  // });
  if (selected.length >= 2) {
    // app.setDates(selected);
  }
  // app.setLanguage({
  //   title: (year, month) => `${activeLanguage["months"][month]} ${year}`,
  //   days: activeLanguage.days,
  //   months: activeLanguage.months
  // });
  app.setDisabled({
    dates: [
      "2018-2-18",
      "2018-2-19",
      "2018-2-22",
      "2018-2-23",
      // new Date(),
      "2018-2-27",
      "2018-2-25",
      "2018-3-28",
      "2018-3-22",
      "2018-3-20",
      "2018-4-19",
      "2018-4-18",
      "2018-4-20",
      "2018-4-29",
      "2018-4-30"
    ],
    // from: new Date(2018, 4, 1), //"2018-5-1",
    // to: new Date(2018, 2, 15),
    days: [2, 3, 5]
  });

  app.setDates([
    "2018-9-27",
    "2018-9-28",
    "2018-10-1",
    "2018-10-2",
    "2018-10-3"
  ]);
  // app.giveMeTheWheel((nodeList, app) => {
  //   Array.prototype.slice.call(nodeList).forEach(item => {
  //     item.addEventListener("click", function() {
  //       let value = item.getAttribute("data-date");
  //       app.selected.push(value);
  //       console.log(app);
  //       app.emit("select", { type: "selected", value: app.selected });
  //     });
  //   });
  // });
  // const bindData = true;
  // if (bindData) {
  //   app.setData(() => {
  //     Object.keys(source).forEach(date => {
  //       if (diff(app.parse(date), startDate, "days") < 0) {
  //         delete source[date];
  //       }
  //     });
  //     return source;
  //   });
  // }
  return app;
}

function popupHandler(visible: boolean) {
  const pop = <HTMLElement>document.querySelector(".popup");
  pop.style.display = visible ? "block" : "none";
}

function init(document: Document) {
  const date = new Date();

  createDatePicker(["2018-9-21", "2018-9-22"], options);

  document.addEventListener("click", e => {
    const target = <HTMLElement>e.target;
    if (target) {
      const parent = <HTMLElement>target.parentNode;

      if (!parent) {
        return null;
      }

      if (parent.nodeType === 1) {
        if (target.tagName.toLowerCase() === "input") {
          popupHandler(true);
        } else if (parent.tagName.toLowerCase() === "body") {
          popupHandler(false);
        }
      } else {
        popupHandler(false);
      }
    }
  });
}

init(document);
