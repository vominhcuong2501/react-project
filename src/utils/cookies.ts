const defaultConfig = {
  expires: '1d',
  path: '; path=/',
  domain: '',
  secure: '',
  sameSite: '; SameSite=Lax',
};
export default {
  install(app, options) {
    if (options) {
      this.config(options.expires, options.path, options.domain, options.secure, options.sameSite);
    }
    if (app.prototype) app.prototype.$cookies = this;
    if (app.config && app.config.globalProperties) {
      app.config.globalProperties.$cookies = this;
      app.provide('$cookies', this);
    }
    app.$cookies = this;
  },
  config(expires, path, domain, secure, sameSite) {
    defaultConfig.expires = expires || '1d';
    defaultConfig.path = path ? `; path=${path}` : '; path=/';
    defaultConfig.domain = domain ? `; domain=${domain}` : '';
    defaultConfig.secure = secure ? '; Secure' : '';
    defaultConfig.sameSite = sameSite ? `; SameSite=${sameSite}` : '; SameSite=Lax';
  },
  get(key) {
    let value =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(
              // eslint-disable-next-line no-useless-escape
              /[\-\.\+\*]/g,
              '\\$&',
            )}\\s*\\=\\s*([^;]*).*$)|^.*$`,
          ),
          '$1',
        ),
      ) || null;

    if (
      value &&
      value.substring(0, 1) === '{' &&
      value.substring(value.length - 1, value.length) === '}'
    ) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  },
  set(key, value, expires, path, domain, secure, sameSite) {
    if (!key) {
      throw new Error('Cookie name is not found in the first argument.');
      // eslint-disable-next-line no-useless-escape
    } else if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)) {
      throw new Error('"]\t current key');
    }
    // support json object
    if (value && value.constructor === Object) {
      value = JSON.stringify(value);
    }
    let _expires = '';
    expires = expires === undefined ? defaultConfig.expires : expires;
    if (expires && expires !== 0) {
      // eslint-disable-next-line default-case
      switch (expires.constructor) {
        case Number:
          if (expires === Infinity || expires === -1) {
            _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
          } else _expires = `; max-age=${expires}`;
          break;
        case String:
          if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expires)) {
            // get capture number group
            const _expireTime = expires.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1');
            // get capture type group , to lower case
            switch (expires.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
              // Frequency sorting
              case 'm':
                _expires = `; max-age=${+_expireTime * 2592000}`;
                break; // 60 * 60 * 24 * 30
              case 'd':
                _expires = `; max-age=${+_expireTime * 86400}`;
                break; // 60 * 60 * 24
              case 'h':
                _expires = `; max-age=${+_expireTime * 3600}`;
                break; // 60 * 60
              case 'min':
                _expires = `; max-age=${+_expireTime * 60}`;
                break; // 60
              case 's':
                _expires = `; max-age=${_expireTime}`;
                break;
              case 'y':
                _expires = `; max-age=${+_expireTime * 31104000}`;
                break; // 60 * 60 * 24 * 30 * 12
              default:
                // eslint-disable-next-line no-new
                new Error('unknown exception of "set operation"');
            }
          } else {
            _expires = `; expires=${expires}`;
          }
          break;
        case Date:
          _expires = `; expires=${expires.toUTCString()}`;
          break;
      }
    }
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${_expires}${
      domain ? `; domain=${domain}` : defaultConfig.domain
    }${path ? `; path=${path}` : defaultConfig.path}${
      // eslint-disable-next-line no-nested-ternary
      secure === undefined ? defaultConfig.secure : secure ? '; Secure' : ''
      // eslint-disable-next-line no-nested-ternary
    }${sameSite === undefined ? defaultConfig.sameSite : sameSite ? `; SameSite=${sameSite}` : ''}`;
    return this;
  },
  remove(key, path, domain) {
    if (!key || !this.isKey(key)) {
      return false;
    }
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
      domain ? `; domain=${domain}` : defaultConfig.domain
    }${path ? `; path=${path}` : defaultConfig.path}; SameSite=Lax`;
    return true;
  },
  isKey(key) {
    return new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|;\\s*)${encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=`,
    ).test(document.cookie);
  },
  keys() {
    if (!document.cookie) return [];
    const _keys = document.cookie
      // eslint-disable-next-line no-useless-backreference, no-useless-escape
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      // eslint-disable-next-line no-useless-escape
      .split(/\s*(?:\=[^;]*)?;\s*/);
    // eslint-disable-next-line no-plusplus
    for (let _index = 0; _index < _keys.length; _index++) {
      _keys[_index] = decodeURIComponent(_keys[_index]);
    }
    return _keys;
  },
};
