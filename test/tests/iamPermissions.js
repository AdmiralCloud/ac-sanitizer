const sanitizer = require('../../index')

module.exports = {
  test: () => {
    it('Field with iamPermissions - user has matching permission -> field is included', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { title: 'Hello' },
        fields: [{ field: 'title', type: 'string', iamPermissions: ['media.read'] }],
        userPermissions: ['media.read', 'media.write']
      })
      expect(r.error).to.be.undefined
      expect(r.params.title).to.equal('Hello')
      return done()
    })

    it('Field with iamPermissions as array - user has one of the required permissions (OR logic) -> field is included', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { title: 'Hello' },
        fields: [{ field: 'title', type: 'string', iamPermissions: ['media.admin', 'media.read'] }],
        userPermissions: ['media.read']
      })
      expect(r.error).to.be.undefined
      expect(r.params.title).to.equal('Hello')
      return done()
    })

    it('Field with iamPermissions - user has none of the required permissions -> error', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { title: 'Hello' },
        fields: [{ field: 'title', type: 'string', iamPermissions: ['media.admin', 'media.write'] }],
        userPermissions: ['media.read']
      })
      expect(r.error.message).to.equal('title_iamPermissionNotSufficient')
      expect(r.error.additionalInfo.required).to.eql(['media.admin', 'media.write'])
      return done()
    })

    it('Field with iamPermissions - user has none of the required permissions and omitFields is true -> field is omitted silently', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { title: 'Hello', id: 1 },
        fields: [
          { field: 'title', type: 'string', iamPermissions: ['media.admin'] },
          { field: 'id', type: 'integer' }
        ],
        userPermissions: ['media.read'],
        omitFields: true
      })
      expect(r.error).to.be.undefined
      expect(r.params.title).to.be.undefined
      expect(r.params.id).to.equal(1)
      return done()
    })

    it('Field with iamPermissions - no userPermissions provided -> check is skipped, field is included', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { title: 'Hello' },
        fields: [{ field: 'title', type: 'string', iamPermissions: ['media.admin'] }]
      })
      expect(r.error).to.be.undefined
      expect(r.params.title).to.equal('Hello')
      return done()
    })

    it('Nested object field with iamPermissions - user has permission -> nested field is included', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { settings: { level: 5, secret: 'topsecret' } },
        fields: [{
          field: 'settings',
          type: 'object',
          properties: [
            { field: 'level', type: 'integer' },
            { field: 'secret', type: 'string', iamPermissions: ['settings.admin'] }
          ]
        }],
        userPermissions: ['settings.admin']
      })
      expect(r.error).to.be.undefined
      expect(r.params.settings.secret).to.equal('topsecret')
      return done()
    })

    it('Nested object field with iamPermissions - user lacks permission and omitFields true -> nested field is omitted', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { settings: { level: 5, secret: 'topsecret' } },
        fields: [{
          field: 'settings',
          type: 'object',
          properties: [
            { field: 'level', type: 'integer' },
            { field: 'secret', type: 'string', iamPermissions: ['settings.admin'] }
          ]
        }],
        userPermissions: ['media.read'],
        omitFields: true
      })
      expect(r.error).to.be.undefined
      expect(r.params.settings.level).to.equal(5)
      expect(r.params.settings.secret).to.be.undefined
      return done()
    })
    it('Deeply nested object field with iamPermissions - user has permission -> field is included', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { settings: { nested: { level: 5, secret: 'topsecret' } } },
        fields: [{
          field: 'settings',
          type: 'object',
          properties: [{
            field: 'nested',
            type: 'object',
            properties: [
              { field: 'level', type: 'integer' },
              { field: 'secret', type: 'string', iamPermissions: ['settings.admin'] }
            ]
          }]
        }],
        userPermissions: ['settings.admin']
      })
      expect(r.error).to.be.undefined
      expect(r.params.settings.nested.secret).to.equal('topsecret')
      return done()
    })

    it('Deeply nested object field with iamPermissions - user lacks permission and omitFields true -> field is omitted', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { settings: { nested: { level: 5, secret: 'topsecret' } } },
        fields: [{
          field: 'settings',
          type: 'object',
          properties: [{
            field: 'nested',
            type: 'object',
            properties: [
              { field: 'level', type: 'integer' },
              { field: 'secret', type: 'string', iamPermissions: ['settings.admin'] }
            ]
          }]
        }],
        userPermissions: ['media.read'],
        omitFields: true
      })
      expect(r.error).to.be.undefined
      expect(r.params.settings.nested.level).to.equal(5)
      expect(r.params.settings.nested.secret).to.be.undefined
      return done()
    })

    it('Array of objects with iamPermissions - user has permission -> field is included in all items', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { items: [{ name: 'foo', secret: 'a' }, { name: 'bar', secret: 'b' }] },
        fields: [{
          field: 'items',
          type: 'array',
          valueType: 'object',
          properties: [
            { field: 'name', type: 'string' },
            { field: 'secret', type: 'string', iamPermissions: ['media.admin'] }
          ]
        }],
        userPermissions: ['media.admin']
      })
      expect(r.error).to.be.undefined
      expect(r.params.items[0].secret).to.equal('a')
      expect(r.params.items[1].secret).to.equal('b')
      return done()
    })

    it('Array of objects with iamPermissions - user lacks permission and omitFields true -> field is omitted from all items', (done) => {
      const r = sanitizer.checkAndSanitizeValues({
        params: { items: [{ name: 'foo', secret: 'a' }, { name: 'bar', secret: 'b' }] },
        fields: [{
          field: 'items',
          type: 'array',
          valueType: 'object',
          properties: [
            { field: 'name', type: 'string' },
            { field: 'secret', type: 'string', iamPermissions: ['media.admin'] }
          ]
        }],
        userPermissions: ['media.read'],
        omitFields: true
      })
      expect(r.error).to.be.undefined
      expect(r.params.items[0].name).to.equal('foo')
      expect(r.params.items[0].secret).to.be.undefined
      expect(r.params.items[1].name).to.equal('bar')
      expect(r.params.items[1].secret).to.be.undefined
      return done()
    })
  }
}
