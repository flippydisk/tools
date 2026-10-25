import Debug from '@flippydisk/tools/debug';
import { Lang } from '@flippydisk/tools';

export default function Page() {
	const debug = new Debug({ debug: true, control: 'NextServer' });
	return <main>{Lang.getStringSafely(debug.options.debug)}</main>;
}
