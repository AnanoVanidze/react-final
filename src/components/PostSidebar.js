import React from 'react'
import { Link } from 'gatsby'

import { getFormattedDate, slugify } from '../utils/helpers'

export const PostSidebar = ({ tags = [], date, categories = [] }) => {
  const category = categories?.filter((category) => category !== 'Highlight')
  const formattedDate = getFormattedDate(date)

  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>About me</h2>
        <p>
          Hello and thanks for visiting! My name is{' '}
          <Link to="/me">hey</Link>, lorem ispum 
        </p>
        <p>
          I'm a software developer who makes open-source projects and writes
          about life, code, design, and more
        </p>
      </div>

      <div className="post-sidebar-card">
        <h2>Post Details</h2>
        <ul>
          <li>
            <strong>Published: </strong> {formattedDate}
          </li>
          <li>
            <strong>Category: </strong>
            <Link to={`/categories/${slugify(category)}`}>{category}</Link>
          </li>
        </ul>

        <h2>Tags</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                className="tag"
                activeClassName="active"
              >
                {tag}
              </Link>
            )
          })}
        </div>
        <p style={{ marginTop: '1.5rem' }}>
          <a
            href="https://taniarascia.substack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe to the Newsletter
          </a>
        </p>
      </div>
    </aside>
  )
}
