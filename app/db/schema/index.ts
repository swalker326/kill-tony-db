import * as episodes from "./episode";
import * as appearances from "./appearance";
import * as comedians from "./comedian";
export const schema = {
	...episodes,
	...appearances,
	...comedians,
};
export * from "./episode";
export * from "./appearance";
export * from "./comedian";
