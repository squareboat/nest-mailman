# Nest Mailman

📮 The mailer package for your NestJS Applications.

### Features

- ✅ Build mails programmtically
- ✅ Supports MJML + React templating
- ✅ Use JSX to easily create clean components
- ✅ Comes with built-in template to quickly send mails without creating templates.
- ✅ Uses nodemailer internally

For complete documentation, head over to [our site](https://squareboat.com/open-source/nest-mailman/).

## Installation

```bash
npm install @squareboat/nest-mailman
```

Requires Node.js 22.12+ (or 24.11+) and NestJS 10, 11 or 12.

The install script copies the starter templates to `resources/views` in your app. npm hides its output, so if the folder is missing (for example with `--ignore-scripts` or a read-only folder), copy them yourself:

```bash
cp -R node_modules/@squareboat/nest-mailman/views resources/views
```

mjml 5 ignores `<mj-include>` unless you set `ignoreIncludes: false` (and `includePath`) in the `mjml` options.

---

## About Us

We are a bunch of dreamers, designers, and futurists. We are high on collaboration, low on ego, and take our happy hours seriously. We'd love to hear more about your product. Let's talk and turn your great ideas into something even greater! We have something in store for everyone. [☎️ 📧 Connect with us!](https://squareboat.com/contact)

---

## License

The MIT License. Please see License File for more information. Copyright © 2020 SquareBoat.

Made with ❤️ by [Squareboat](https://squareboat.com)
