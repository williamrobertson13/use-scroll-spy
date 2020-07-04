# use-scroll-spy

> A React hook for keeping track of components based on their scroll position

[![NPM](https://img.shields.io/npm/v/use-scroll-spy.svg)](https://www.npmjs.com/package/use-scroll-spy) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-scroll-spy
```

## Usage

```tsx
import * as React from 'react';
import useScrollSpy from 'use-scroll-spy';

export default function Example() {
  const [scrollItems, setScrollItemRef] = useScrollSpy(2);

  return (
    <div>
      {scrollItems.map(({ ref, isActive }) => {
        <a
          key={ref?.id}
          href={ref?.id}
          className={isActive ? 'is-active' : ''}
          onClick={(e) => {
            e.preventDefault();
            window.history.replaceState(null, '', `#${ref?.id}`);
            ref?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
          }}
        >
          {ref?.dataset?.title || 'Navigate to link'}
        </a>;
      })}
      <section id="one" data-title="Section one" ref={(ref) => setScrollItemRef(ref, 0)}></section>
      <section id="two" data-title="Section two" ref={(ref) => setScrollItemRef(ref, 1)}></section>
    </div>
  );
}
```

## License

MIT © [williamrobertson13](https://github.com/williamrobertson13)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
