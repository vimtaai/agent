export function insertIntoDocument(element, parentElement = document.body) {
  const scriptElement = parentElement.querySelector("script");
  const hasScriptElement = scriptElement !== null;
  const referenceElement = hasScriptElement ? scriptElement : parentElement;
  const relativePosition = hasScriptElement ? "beforebegin" : "beforeend";

  referenceElement.insertAdjacentElement(relativePosition, element);
}
