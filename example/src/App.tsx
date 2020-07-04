import './App.css';

import React, { useState } from 'react';
import useScrollSpy from 'use-scroll-spy';
import Sidebar from './Sidebar';
import { Lesson } from './types';

const mockLessonData: Lesson = {
  Prepare: [
    {
      id: 'red',
      title: 'Hello red!',
    },
    {
      id: 'pink',
      title: 'Hello pink!',
    },
  ],
  'Design your repair kit': [
    {
      id: 'orange',
      title: 'Hello orange!',
    },
    {
      id: 'green',
      title: 'Hello green!',
    },
  ],
  'Test your patch': [
    {
      id: 'blue',
      title: 'Hello blue!',
    },
  ],
};

export default function App() {
  const [lesson, setLesson] = useState(mockLessonData);
  const sections = Object.values(lesson).flat(1);

  const [scrollItems, setScrollItemRef] = useScrollSpy(sections.length);

  return (
    <div className="App">
      <Sidebar
        scrollItems={scrollItems}
        lesson={lesson}
        handleRemoveLesson={() => {
          setLesson((prevState) => {
            // This is purely demonstrational to show that the scroll-spy hook works in responsive to dynamic
            // changes to section data
            const keysArr = Object.keys(prevState);
            const randomIndex = Math.floor(Math.random() * keysArr.length);
            const randomKey = keysArr[randomIndex];
            delete prevState[randomKey];
            return { ...prevState };
          });
        }}
      />
      <div className="App-content">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`App-section App-section--${section.id}`}
            ref={(ref) => setScrollItemRef(ref, index)}
          ></section>
        ))}
      </div>
    </div>
  );
}
