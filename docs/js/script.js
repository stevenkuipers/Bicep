/*jshint esversion: 6 */
const CSSROOT = Array.from(document.styleSheets)
.filter(
sheet =>
  sheet.href === null || sheet.href.startsWith(window.location.origin)
)
.reduce(
(acc, sheet) =>
  (acc = [
    ...acc,
    ...Array.from(sheet.cssRules).reduce(
      (def, rule) =>
        (def =
          rule.selectorText === ":root"
            ? [
                ...def,
                ...Array.from(rule.style).filter(name =>
                  name.startsWith("--")
                )
              ]
            : def),
      []
    )
  ]),
[]
);

const colors = CSSROOT.filter(val => val.match('--color'));
const colorcontainer = document.querySelector('.color-examples-container');

for (let color of colors){
  let parent = document.createElement('div');

  let el = document.createElement('div');
  el.style.backgroundColor = `var(${color})`;
  el.style.padding = 'var(--padding-m)';
  parent.append(el);

  let el2 = document.createElement('div');
  let val = getComputedStyle(document.documentElement).getPropertyValue(color);
  el2.style.paddingLeft = 'var(--padding-m)';
  el2.innerText = `${color} : ${val}`;
  parent.append(el2);
  // add elements to container
  colorcontainer.append(parent);
}
