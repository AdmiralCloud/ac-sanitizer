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
      {
        name: "Object with nested properties - missing nested property",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'id', type: 'integer', required: true } 
          ]}
        ],
        value: {
          boo: true,
          enum: "blue",
          nested: {
          }
        },
        error: "object_nested_field_id_required",
      },
      {
        name: "Object with nested properties - invalid nested property",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'id', type: 'integer', required: true } 
          ]}
        ],
        value: {
          boo: true,
          enum: "blue",
          nested: {
            id: 'abc'
          }
        },
        error: "object_nested_id_notAFiniteNumber",
      },
      {
        name: "Object with nested properties - missing nested property",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'id', type: 'integer', required: true } 
          ]}
        ],
        value: {
          boo: true,
          enum: "blue"
        },
        expected: {
          boo: true,
          enum: "blue"
        }
      },
      {
        name: "Object with nested properties - and conditional requirements",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'setId', type: 'boolean', required: true },
            { field: 'id', type: 'integer', required: 'setId' }
          ]}
        ],
        value: {
          boo: true,
          enum: "blue",
          nested: {
            setId: true,
            id: 123
          }
        },
        expected: {
          boo: true,
          enum: "blue",
          nested: {
            setId: true,
            id: 123
          }
        }
      },
      {
        name: "Object with nested properties - and conditional requirements",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'setId', type: 'boolean', required: true },
            { field: 'id', type: 'integer', required: 'setId' }
          ]}
        ],
        value: {
          boo: true,
          enum: "blue",
          nested: {
            setId: true
          }
        },
        error: "object_nested_field_id_required",
      },
      {
        name: "Object with nested properties - and conditional requirements",
        type: "object",
        properties: [
          { field: "boo", type: "boolean" },
          { field: "enum", type: "string", enum: ["blue", "green"] },
          { field: "nested", type: "object", properties: [
            { field: 'setId', type: 'boolean', required: false }
          ]}
        ],
        value: {
          boo: true,
          enum: "blue",
          nested: {
            setId: false
          }
        },
        expected: {
          boo: true,
          enum: "blue",
          nested: {
            setId: false
          }
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
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, "params.object")).toEqual(_.get(test, "expected"));
        }
        return done();
      });
    });
  },
};
