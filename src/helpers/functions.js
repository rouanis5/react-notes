const removeTags = (htmlText) => {
  // HTML tags contain text
  var html = htmlText;
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export { removeTags };
