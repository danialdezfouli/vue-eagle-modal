import text from './input';
import image from './image';
import select from './select';
import checkbox from './checkbox';
import radio from './radio';
import textarea from './textarea';
import file from './file';
import content from './content';


let items = {text,image,checkbox,radio,select,textarea,file,content};

// modify
let _items = {};
for(let k in items) _items['eform-' + k] = items[k];
export default _items;