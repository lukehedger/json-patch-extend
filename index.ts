import { type Operation, applyPatch } from "json-joy/es6/json-patch";
import jsonata from "jsonata";

const input = { a: 1, b: 2 };

const patch: Operation[] = [
	// regular patch operations
	{ op: "add", path: "/foo", value: "bar" },
	{ op: "remove", path: "/a" },
	{ op: "remove", path: "/b" },
	// custom patch operations
	{
		op: "extend",
		path: "",
		props: {
			// with plain JS
			c: ((a: number, b: number) => a + b)(input.a, input.b),
			now: (() => new Date().toISOString())(),
			// with JSONata
			cX: await jsonata("$sum(a + b)").evaluate(input),
			nowX: await jsonata("$now()").evaluate({}),
		},
	},
];

const { doc: result } = applyPatch(input, patch, { mutate: true });

console.log(result);
