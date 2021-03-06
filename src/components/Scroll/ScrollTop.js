import ReactDOM from 'react-dom'
import scroll from '../../utils/scroll'
import scrollDoc from 'scroll-doc'

const page = scrollDoc()

function calculateScrollOffset(element, offset, alignment) {
  //console.log('calculateScrollOffset: ', element, offset, alignment)
  var body = document.body,
      html = document.documentElement;
  var elementRect = element.getBoundingClientRect();
  var clientHeight = html.clientHeight;
  var documentHeight = Math.max( body.scrollHeight, body.offsetHeight,
                                 html.clientHeight, html.scrollHeight, html.offsetHeight );
  offset = offset || 0; // additional offset to top
  var scrollPosition;
  switch(alignment) {
      case 'top': scrollPosition = elementRect.top; break;
      case 'middle': scrollPosition = elementRect.bottom - clientHeight / 2 - elementRect.height / 2; break;
      case 'bottom': scrollPosition = elementRect.bottom - clientHeight; break;
      default: scrollPosition = elementRect.bottom - clientHeight / 2 - elementRect.height / 2; break; //defaul to middle
    }
  var maxScrollPosition = documentHeight - clientHeight;

  // for some reason alignment seems to have no effect on the services scroll
  // however setting the offset works well
  //console.log('result: ', Math.min(scrollPosition + offset + window.pageYOffset,maxScrollPosition))
  return Math.min(scrollPosition + offset + window.pageYOffset,
                  maxScrollPosition);
}

export default function (ref, options, callback) {
  options = options || {
    offset: 0,
    align: 'middle'
  };
  var element = ReactDOM.findDOMNode(ref);
  if (element === null) return 0;

  if (options.duration === 0) {
    return page.scrollTop = calculateScrollOffset(element, options.offset, options.align)
  } else {
    return scroll.top(page, calculateScrollOffset(element, options.offset, options.align), options, callback);
  }

};