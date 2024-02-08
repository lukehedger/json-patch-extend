import { type Operation, applyPatch } from "json-joy/es6/json-patch";
import jsonata from "jsonata";

const input = { a: 1, b: 2 };

// plain JS
const now = () => new Date().toISOString();
const sum = (a: number, b: number) => a + b;

// with JSONata
const nowX = jsonata("$now()");
const sumX = jsonata("$sum(a + b)");

const patch: Operation[] = [
	{ op: "add", path: "/foo", value: "bar" },
	{ op: "remove", path: "/a" },
	{ op: "remove", path: "/b" },
	{
		op: "extend",
		path: "",
		props: {
			c: sum(input.a, input.b),
			now: now(),
			cX: await sumX.evaluate(input),
			nowX: await nowX.evaluate({}),
		},
	},
];

const result = applyPatch(input, patch, { mutate: true });

console.log(result.doc);
