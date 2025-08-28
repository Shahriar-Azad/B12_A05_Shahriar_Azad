Ans no 01: "getElementById" gets one element by its ID. "getElementsByClassName" gets multiple elements by class, returning a live collection. 
"querySelector" uses a CSS selector to find the first matching element, while querySelectorAll finds all matches, returning a static list. 
The main differences are in what they return and whether that list updates automatically with DOM changes.



Ans no 02: By using document.createElement() to make a new element, set its properties, then insert it with a method like appendChild(). For example:
const newElement = document.createElement('div');
newElement.textContent = 'Hello World';
document.body.appendChild(newElement);


Ans no 03: Event Bubbling is when an event starts from the target element and propagates upward through its ancestors in the DOM tree.
For example, when you click a button, the click event fires first on the button, then on its parent, and so on up to the document root.
This allows you to handle events on parent elements rather than individual child elements.


Ans no 04: Event Delegation is a technique where you attach a single event listener to a parent element to handle events triggered by its children.
It's useful because:
It improves performance by minimizing event listeners.
It works automatically with dynamically added elements.
It reduces memory usage in complex applications.


Ans no 05: "preventDefault()" stops the browser's default behavior for an event (like following a link or submitting a form).
"stopPropagation()" stops the event from bubbling up the DOM tree to parent elements, but the default action still occurs.
We can use both together if needed.
