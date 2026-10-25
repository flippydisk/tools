import Debug from '@flippydisk/tools/debug';
import { Lang } from '@flippydisk/tools';

const debug = new Debug({ control: 'ViteConsumer' });
document.querySelector('#app').textContent = Lang.getStringSafely(debug.options.debug);
