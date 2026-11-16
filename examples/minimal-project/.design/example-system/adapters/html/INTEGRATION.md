# HTML Example Integration

This adapter supports only the sample `reading` profile. It does not convert
Markdown, install a site framework, or inject CSS automatically.

Include [reading.css](reading.css) through the project's existing asset/build
mechanism and apply `example-reading` to the relevant content container. Do not
assume `.design/` is a public static directory or serve the entire package to a
browser. Copy/bundle only intended runtime assets through the existing build.

```html
<article class="example-reading">
  <p>First sample paragraph.</p>
  <p>Second sample paragraph.</p>
</article>
```

The stylesheet mirrors the spacing token by hand for this small fixture. It is
not proof of a token compiler. When extending the example, load the project's own
CSS afterward and deliberately override the custom property on this container.
That describes CSS cascade behavior, not a Design-DX-wide extension algorithm.

No external fonts, scripts, or network assets are required. No browser, layout,
or accessibility acceptance is claimed by shipping this file.
