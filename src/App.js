import React, { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to your Markdown Previewer!');
  const [activeTab, setActiveTab] = useState('github');

  const markdownFlavors = {
    github: {
      name: 'GitHub',
      config: {
        skipHtml: false,
      }
    },
    reddit: {
      name: 'Reddit',
      config: {
        skipHtml: true,
        allowElement: (element) => {
          return element.tagName !== 'img';
        }
      }
    },
    microsoft: {
      name: 'Microsoft',
      config: {
        skipHtml: false,
      }
    },
    standard: {
      name: 'Standard',
      config: {
        skipHtml: false,
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Markdown Previewer</h1>

      <ul className="nav nav-tabs mb-3">
        {Object.keys(markdownFlavors).map((flavor) => (
          <li className="nav-item" key={flavor}>
            <button
              className={`nav-link ${activeTab === flavor ? 'active' : ''}`}
              onClick={() => setActiveTab(flavor)}
            >
              {markdownFlavors[flavor].name}
            </button>
          </li>
        ))}
      </ul>

      <textarea
        className="form-control mb-3"
        rows="10"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="border p-3 bg-light">
        <MarkdownPreview
          source={markdown}
          {...markdownFlavors[activeTab].config}
        />
      </div>
    </div>
  );
}

export default App;