import React from 'react';
import './App.css';
import { ScrollItem } from 'use-scroll-spy';
import { Lesson } from './types';

type Props = {
  lesson: Lesson;
  scrollItems: ScrollItem[];
  handleRemoveLesson: () => void;
};

export default function Sidebar({ lesson, scrollItems, handleRemoveLesson }: Props) {
  const scrollItemsIt = scrollItems[Symbol.iterator]();

  return (
    <nav className="Sidebar">
      <ul className="Sidebar-list">
        {Object.entries(lesson).map(([title, sections]) => (
          <li className="Sidebar-mainListItem" key={title}>
            {title}
            <ul>
              {sections.map((section) => {
                const { isActive, ref } = scrollItemsIt.next().value as ScrollItem;

                return (
                  <li
                    key={section.id}
                    className={'Sidebar-secondaryListItem' + (isActive ? ' Sidebar-secondaryListItem--active' : '')}
                  >
                    <a
                      className="Sidebar-link"
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.replaceState(null, '', `#${section.id}`);
                        ref.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
                      }}
                    >
                      {section.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      <p>The scroll-spy library works with dynamic sections!</p>
      <button onClick={handleRemoveLesson}>Remove a lesson</button>
    </nav>
  );
}
