const _ = require("lodash");
const expect = require("expect");
const sanitizer = require("../../index");

module.exports = {
  test: () => {
    const baseTests = [
      {
        name: "Valid object",
        type: "object",
        value: { a: true },
        expected: { a: true },
      },
      {
        name: "Invalid object",
        type: "object",
        value: "a",
        error: "object_notAPlainObject",
      },
      {
        name: "Object with properties",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
        ],
        value: {
          boo: true,
          enum: "blue",
          remove: 1,
        },
        expected: {
          boo: true,
          enum: "blue",
        },
      },
    ];

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            object: _.get(test, "value"),
          },
          fields: [
            {
              field: "object",
              type: _.get(test, "type"),
              required: _.get(test, "required"),
              properties: _.get(test, "properties"),
            },
          ],
        };
        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck);
        if (_.get(test, "error")) {
          expect(_.get(r, "error.message")).toEqual(test.error);
        } else {
          expect(_.get(r, "params.object")).toEqual(_.get(test, "expected"));
        }
        return done();
      });
    });
  },
};
